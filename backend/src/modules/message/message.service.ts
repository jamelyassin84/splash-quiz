import {Injectable} from '@nestjs/common'
import {CreateMessageDto} from './message.dto'
import {MessageEntity} from './message.entity'
import {RoundEntity} from '../round/round.entity'
import {PlayerEntity} from '../player/player.entity'
import {Server, Socket} from 'socket.io'
import {
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'

@Injectable()
@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class MessageService {
    constructor() {}

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

    async fetchMessages(roundId: string) {
        try {
            const players = await PlayerEntity.find()

            const messages = await MessageEntity.find({
                where: {roundId: roundId},
            })

            return messages.map((message) => ({
                ...message,
                player: players.find((p) => p.id === message.playerId),
            }))
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to create message: ${error.message}`)
        }
    }

    async create(payload: CreateMessageDto) {
        try {
            const round = await RoundEntity.findOne({
                where: {id: payload.roundId},
            })
            const player = await PlayerEntity.findOne({
                where: {id: payload.playerId},
            })

            if (!round) {
                throw new Error(`Round not found`)
            }

            if (!player) {
                throw new Error(`Player not found`)
            }

            const message = await MessageEntity.create({
                ...payload,
                roundId: round.id,
            }).save()

            // Emit socket event when a message is created
            this.server.emit(`messageCreated:${round.id}`, {
                ...message,
                player: player,
            })

            return {
                ...message,
                player: player,
            }
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to create message: ${error.message}`)
        }
    }

    async startBotChatting(roundId: string) {
        const chats = [
            'Hi',
            'Hi Guys',
            'I could play this all day',
            'Hi men',
            'I hope I won',
            "Let's see",
        ]

        const players = await PlayerEntity.find({
            where: {isCPU: true},
        })

        const maxChats = Math.floor(Math.random() * 4) + 1
        const maxDelay = 7000

        for (let i = 0; i < maxChats; i++) {
            setTimeout(async () => {
                const randomPlayerIndex = Math.floor(
                    Math.random() * players.length,
                )

                const randomPlayer = players[randomPlayerIndex]

                const randomChatIndex = Math.floor(Math.random() * chats.length)
                const chatMessage = chats[randomChatIndex]

                const messagePayload = {
                    playerId: randomPlayer.id,
                    roundId: roundId,
                    content: chatMessage,
                }

                await this.create(messagePayload as CreateMessageDto)
            }, Math.random() * maxDelay)
        }
    }
}
