import {BaseModel} from './base.model'
import {Bet} from './bet.model'
import {Round} from './round.model'

export interface Player extends BaseModel {
    name: string
    isCPU: boolean
    totalPoints: string
    round: Round
    bet: Bet
}
