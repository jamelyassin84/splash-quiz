import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from 'typeorm'

@Entity()
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    content: string

    @Column()
    playerId: string

    @Column()
    roundId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
