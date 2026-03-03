import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({unique: true})
    nombre!: string
    @Column()
    precio!: number
    @Column()
    stock!: number
    @Column()
    fecha_ingreso!: string
}
