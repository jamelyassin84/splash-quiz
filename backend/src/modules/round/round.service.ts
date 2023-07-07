import {Injectable} from '@nestjs/common'
import {RoundEntity} from './round.entity'
import {MessageService} from '../message/message.service'
import {PlayerEntity} from '../player/player.entity'
import {Player} from '../player/player.model'
import {
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import {Server} from 'http'
import {Socket} from 'socket.io'

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class RoundService {
    constructor(private _messageService: MessageService) {}

    @WebSocketServer()
    public server: Server

    animationInSeconds = 15 * 1000

    onModuleInit() {
        this.server.on('connection', async (socket: Socket) => {
            try {
            } catch (error) {
                socket.disconnect(true)
                throw new WsException(error)
            }
        })
    }

    async setRoundInActive(body: {
        roundId: string
        playerId: string
        points: number
        multiplier: number
        speed: number
        players: Player[]
    }) {
        try {
            const {roundId, playerId, points, multiplier, players, speed} = body

            const round = await RoundEntity.findOne({where: {id: roundId}})
            if (!round) {
                throw new Error('Round not found')
            }

            let player = await PlayerEntity.findOne({where: {id: playerId}})
            if (!player) {
                throw new Error('Player not found')
            }

            let newPoints = parseInt(player.totalPoints)

            round.isRoundActive = false
            round.winningNumber = Math.random() * (10 - 0) + 0

            const won = this.isWinner({
                player: player as any,
                players: players,
                multiplier: multiplier,
                winningNumber: round.winningNumber,
            })

            if (player && won) {
                newPoints += points * multiplier
            }

            if (player && !won) {
                newPoints -= points
            }

            player.totalPoints = newPoints.toString()

            // Emit socket the total points in time
            setTimeout(() => {
                this.server.emit(
                    `totalPoints:${player.id}`,
                    newPoints.toString(),
                )
            }, this.animationInSeconds / speed)

            await player.save()

            round.save()

            return await {...round, player: player, won: won}
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    isWinner(data: {
        players: Player[]
        player: Player
        multiplier: number
        winningNumber: number
    }): boolean {
        const {players, player, multiplier, winningNumber} = data

        const sortedPlayers = players
            .map((p) => {
                if (p && !p.isCPU) {
                    return {
                        ...p,
                        bet: {multiplier: multiplier},
                        distance: Math.abs(multiplier - winningNumber!),
                    }
                }

                return {
                    ...p,
                    distance: Math.abs(p.bet.multiplier - winningNumber!),
                }
            })
            .sort((a, b) => {
                if (a.distance !== b.distance) {
                    return a.distance - b.distance
                } else {
                    return a.bet.multiplier - b.bet.multiplier
                }
            })

        if (player.name === sortedPlayers[0].name) {
            return true
        }

        return false
    }

    async getOrCreateActiveRound() {
        try {
            const activeRound = await RoundEntity.findOne({
                where: {isRoundActive: true},
            })

            if (activeRound) {
                return activeRound
            }

            const round = await RoundEntity.create({
                isRoundActive: true,
            }).save()

            this._messageService.startBotChatting(round.id)

            return round
        } catch (error) {
            console.error(error)
            throw new Error('Failed to get or create active round')
        }
    }
}
