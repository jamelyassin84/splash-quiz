import {BaseModel} from './base.model'
import {Player} from './player.model'
import {Round} from './round.model'

export interface Message extends BaseModel {
    player: Player
    round: Round
    content: string
}
