import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    nombre!: string
    @Column({unique: true})
    nit!: number
    @Column()
    email!: string
}
