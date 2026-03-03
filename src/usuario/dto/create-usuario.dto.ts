import { IsEmail, IsString, MinLength} from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3)
    nombre!: string
    @IsString()
    @IsEmail()
    email!: string
    @IsString()
    @MinLength(3)
    password!: string
    @IsString()
    rol!: string
}
