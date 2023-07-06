import {BaseModel} from './base.model'
import {Round} from './round.model'

export interface Player extends BaseModel {
    name: string
    isCPU: boolean
    totalPoints: string
    round: Round
}
