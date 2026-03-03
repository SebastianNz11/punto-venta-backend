import { IsDateString, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsString()
    @MinLength(3)
    nombre!: string
    @IsNumber()
    @Min(0)
    precio!: number
    @IsNumber()
    @Min(0)
    stock!: number
    @IsDateString()
    fecha_ingreso!: string
}
