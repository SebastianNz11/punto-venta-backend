import { Cliente } from "src/cliente/entities/cliente.entity";
import { DetalleVenta } from "src/detalle-venta/entities/detalle-venta.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Venta {
    @PrimaryGeneratedColumn('uuid')
    id!: string
    @Column()
    fecha!: string
    @Column({ type: 'uuid', nullable: true })
    clienteId!: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.venta)
    @JoinColumn({ name: 'clienteId' })
    cliente!: Cliente;

    @Column({ type: 'uuid', nullable: true })
    usuarioId!: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.venta)
    @JoinColumn({ name: 'usuarioId' })
    usuario!: Usuario;
    @OneToMany(() => DetalleVenta, (detalle) => detalle.venta)
    detalles!: DetalleVenta[];
}
