import {BaseModel} from './base.model'
import {Player} from './player.model'

export interface Bet extends BaseModel {
    speed: number
    points: number
    multiplier: number
}
