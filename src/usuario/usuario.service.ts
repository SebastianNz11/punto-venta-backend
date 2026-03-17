import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const email = await this.usuarioRepository.findOne({where: {email: createUsuarioDto.email}});
    if (email) {
      throw new ConflictException('El email ya existe');
    }
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return await this.usuarioRepository.save(usuario);
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find()
    return usuarios;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({id});
    if (!usuario) {
      throw new BadRequestException('No se encontró el usuario');
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    if (updateUsuarioDto.password) {
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }
    const usuario = await this.usuarioRepository.preload({
      id,
      ...updateUsuarioDto
    })
    if (!usuario) {
      throw new BadRequestException('No se encontró el usuario');
    }
    return await this.usuarioRepository.save(usuario);
  }

  async remove(id: string) {
    const usuario = await this.usuarioRepository.delete(id);
    if (usuario.affected === 0) {
      throw new NotFoundException('El usuario no existe');
    }
    return {message: "Usuario eliminado con exito"}
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
}
