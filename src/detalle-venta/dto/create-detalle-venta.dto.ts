import { IsNumber, IsString, Min } from "class-validator";

export class CreateDetalleVentaDto {
    @IsString()
    productoId!: string
    @IsString()
    ventaId!: string
    @IsNumber()
    @Min(0)
    cantidad!: number
    @IsNumber()
    @Min(0)
    precio_unitario!: number
}
