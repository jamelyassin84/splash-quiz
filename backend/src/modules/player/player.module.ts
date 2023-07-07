import {Module} from '@nestjs/common'
import {PlayerService} from './player.service'
import {PlayerController} from './player.controller'
import {Server} from 'socket.io'
import {RoundService} from '../round/round.service'
import {MessageService} from '../message/message.service'

@Module({
    providers: [PlayerService, Server, RoundService, MessageService],
    controllers: [PlayerController],
})
export class PlayerModule {}
