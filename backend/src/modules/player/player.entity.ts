import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm'

@Entity()
export class PlayerEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    isCPU: boolean

    @Column()
    totalPoints: string
}
