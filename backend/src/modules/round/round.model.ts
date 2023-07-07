import {BaseModel} from 'src/core/models/base.model'
import {Bet} from '../bet/bet.model'

export interface Round extends BaseModel {
    isRoundActive: boolean
    winningNumber: boolean
}
