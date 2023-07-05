import {BaseModel} from './base.model'
import {Player} from './player.model'

export interface Bet extends BaseModel {
    speed: number
    player: Player
    points: number
    multiplier: number
}
