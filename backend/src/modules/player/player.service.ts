import {Injectable} from '@nestjs/common'
import {PlayerEntity} from './player.entity'
import {CreatePlayerDto} from './player.dto'
import {Player} from './player.model'
import {RoundService} from '../round/round.service'
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
export class PlayerService {
    constructor(private readonly roundService: RoundService) {}

    @WebSocketServer()
    public server: Server

    onModuleInit() {
        this.server.on('connection', async (socket: Socket) => {
            try {
            } catch (error) {
                socket.disconnect(true)
                throw new WsException(error)
            }
        })
    }

    async upsert(payload: CreatePlayerDto) {
        const {name} = payload

        let player = await PlayerEntity.findOne({where: {name}})

        if (player) {
            player.totalPoints = '1000'
            player.save()
        }

        if (!player) {
            player = await PlayerEntity.create({
                ...payload,
                totalPoints: '1000',
                isCPU: false,
            }).save()
        }

        const players = [player, ...this.createBots(4)]
        const round = await this.roundService.getOrCreateActiveRound()

        await Promise.all(
            players.map(async (p) => {
                if (p.isCPU) {
                    const playerEntity = await PlayerEntity.create({
                        ...p,
                    }).save()
                    p.id = playerEntity.id
                }
            }),
        )

        const newPlayers = players.map((p) => ({...p, round: round}))

        // Emit socket event after players are created
        this.server.emit(
            `playerCreated:${round.id}`,
            newPlayers.find((p) => !p.isCPU),
        )

        return newPlayers
    }

    private createBots(botNumbers: number): Player[] {
        return Array.from({length: botNumbers}, (_, i) => {
            return {
                name: `CPU ${i + 1}`,
                isCPU: true,
                totalPoints: '1000',
                bet: {
                    speed: 1,
                    points: Math.floor(Math.random() * 1000),
                    multiplier: Math.floor(Math.random() * 10),
                },
            }
        })
    }
}
