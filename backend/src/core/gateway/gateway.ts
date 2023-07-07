import {OnModuleInit} from '@nestjs/common'
import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets'
import {Socket} from 'socket.io'
import {Server} from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true,
    },
})
export class Gateway implements OnModuleInit {
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

    @SubscribeMessage('ping')
    handlePing() {
        this.server.emit('pong')
    }

    @SubscribeMessage('messageCreated')
    async handleNewConversation(
        @MessageBody() body: {roundId: string},
        @ConnectedSocket() socket: Socket,
    ) {
        const {roundId} = body
        await socket.join(roundId)

        this.server.to(roundId).emit('onCreateConversation', {data: 'Message'})
    }
}
