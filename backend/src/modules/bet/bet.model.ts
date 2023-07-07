import {BaseModel} from 'src/core/models/base.model'
import {Player} from '../player/player.model'

export interface Bet extends BaseModel {
    speed: number
    player?: Player
    points: number
    multiplier: number
}
