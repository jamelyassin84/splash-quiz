import {Module} from '@nestjs/common'
import {MessageService} from './message.service'
import {MessageController} from './message.controller'
import {Server} from 'socket.io'
import {Gateway} from 'src/core/gateway/gateway'

@Module({
    imports: [],
    providers: [MessageService, Server, Gateway],
    controllers: [MessageController],
})
export class MessageModule {}
