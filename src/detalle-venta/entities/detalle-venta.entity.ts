import { Producto } from "src/producto/entities/producto.entity";
import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetalleVenta {
    @PrimaryGeneratedColumn()
    id!: string
    @ManyToOne(() => Producto, (producto) => producto.detalles)
    producto!: Producto;
    @ManyToOne(() => Venta, (venta) => venta.detalles)
    venta!: Venta;
    @Column()
    cantidad!: number
    @Column()
    precio_unitario!: number
    @Column()
    total!: number
}
