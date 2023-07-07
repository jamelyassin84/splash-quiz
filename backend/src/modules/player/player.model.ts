import {BaseModel} from 'src/core/models/base.model'
import {Bet} from '../bet/bet.model'

export interface Player extends BaseModel {
    name: string
    isCPU: boolean
    totalPoints: string
    bet: Bet
}
