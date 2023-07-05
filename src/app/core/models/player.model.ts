import {BaseModel} from './base.model'

export interface Player extends BaseModel {
    name: string
    isCPU: boolean
    totalPoints: string
    prediction: string
}
