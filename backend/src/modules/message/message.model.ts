import {BaseModel} from 'src/core/models/base.model'
import {Player} from '../player/player.model'
import {Round} from '../round/round.model'

export interface Message extends BaseModel {
    player: Player
    round: Round
    content: string
}
