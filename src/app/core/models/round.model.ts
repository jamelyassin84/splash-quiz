import {BaseModel} from './base.model'
import {Bet} from './bet.model'
import {Player} from './player.model'

export interface Round extends BaseModel {
    name: string
    bets: Bet[]
    isRoundActive: boolean
}
