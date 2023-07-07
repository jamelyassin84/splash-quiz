import {IsString} from 'class-validator'
import {BaseEntity} from 'typeorm'

export class CreateMessageDto extends BaseEntity {
    @IsString()
    playerId: string

    @IsString()
    roundId: string

    @IsString()
    content: string
}
