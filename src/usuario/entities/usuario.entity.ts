import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    nombre!: string
    @Column({unique: true})
    email!: string
    @Column()
    password!: string
    @Column()
    rol!: string
    @OneToMany(() => Venta, (venta) => venta.usuario)
    venta!: Venta[]
}
