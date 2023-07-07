import {IsString, IsBoolean} from 'class-validator'

export class CreatePlayerDto {
    @IsString()
    name: string

    @IsBoolean()
    isCPU: boolean

    @IsString()
    totalPoints: string
}
