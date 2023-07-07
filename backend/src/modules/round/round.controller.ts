import {Controller, Get, Post, Body} from '@nestjs/common'
import {RoundService} from './round.service'
import {Player} from '../player/player.model'

@Controller('rounds')
export class RoundController {
    constructor(private readonly roundService: RoundService) {}

    @Post()
    setRoundInActive(
        @Body()
        body: {
            roundId: string
            playerId: string
            points: number
            multiplier: number
            speed: number
            players: Player[]
        },
    ) {
        return this.roundService.setRoundInActive(body)
    }
}
