import {IsDate, IsDateString, IsString} from 'class-validator'

export class CreateVentaDto {
    @IsDateString()
    fecha!: string
    @IsString()
    clienteId!: string;
    @IsString()
    usuarioId!: string;
}
