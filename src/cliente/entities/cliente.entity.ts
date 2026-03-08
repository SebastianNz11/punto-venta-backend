import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @OneToMany(() => Venta, (venta) => venta.cliente)
    venta!: Venta[]
}
