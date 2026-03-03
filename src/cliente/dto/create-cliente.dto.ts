import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString, Min, MinLength } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @MinLength(2)
    nombre!: string
    @Type(()=> Number)
    @IsNumber()
    @Min(10000000)
    nit!: number
    @IsEmail()
    email!: string
}
