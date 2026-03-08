import { Cliente } from "src/cliente/entities/cliente.entity";
import { DetalleVenta } from "src/detalle-venta/entities/detalle-venta.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    fecha!: string
    @ManyToOne(() => Cliente, (cliente) => cliente.venta)
    cliente!: Cliente
    @ManyToOne(() => Usuario, (usuario) => usuario.venta)
    usuario!: Usuario
    @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
    detalles!: DetalleVenta[];
}
