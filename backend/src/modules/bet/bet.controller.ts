import {Controller, Get, Post, Body} from '@nestjs/common'
import {BetService} from './bet.service'
import {Round} from '../round/round.model'

@Controller('bets')
export class BetController {
    constructor(private readonly betService: BetService) {}

    @Post('/getWinningCombination')
    getWinningCombination(): number {
        return this.betService.getWinningCombination()
    }
}
