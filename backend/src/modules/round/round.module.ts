import {Module} from '@nestjs/common'
import {RoundService} from './round.service'
import {RoundController} from './round.controller'
import {MessageService} from '../message/message.service'
import {Server} from 'socket.io'

@Module({
    providers: [RoundService, MessageService, Server],
    controllers: [RoundController],
})
export class RoundModule {}
