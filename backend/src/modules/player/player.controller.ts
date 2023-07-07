import {Controller, Post, Body} from '@nestjs/common'
import {PlayerService} from './player.service'
import {CreatePlayerDto} from './player.dto'
import {Player} from './player.model'

@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post()
    createPlayer(@Body() player: CreatePlayerDto)  {
        return this.playerService.upsert(player)
    }
}
