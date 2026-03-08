import { DetalleVenta } from "src/detalle-venta/entities/detalle-venta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @OneToMany(() => DetalleVenta, (detalle) => detalle.producto)
    detalles!: DetalleVenta[];
}
