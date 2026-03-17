import { Producto } from "src/producto/entities/producto.entity";
import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class DetalleVenta {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column({ type: 'uuid', nullable: true })
    productoId!: string;

    @ManyToOne(() => Producto, (producto) => producto.detalles)
    @JoinColumn({ name: 'productoId' })
    producto!: Producto;

    @Column({ type: 'uuid', nullable: true })
    ventaId!: string;

    @ManyToOne(() => Venta, (venta) => venta.detalles)
    @JoinColumn({ name: 'ventaId' })
    venta!: Venta;
    @Column()
    cantidad!: number
    @Column()
    precio_unitario!: number
    @Column()
    total!: number
}
