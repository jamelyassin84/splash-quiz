import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    ManyToOne,
} from 'typeorm'

@Entity()
export class RoundEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({default: true})
    isRoundActive: boolean

    @Column({default: null})
    winningNumber: number

    @ManyToOne(() => RoundEntity)
    round: RoundEntity

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
