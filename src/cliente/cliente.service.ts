import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){}
  async create(createClienteDto: CreateClienteDto) {
    const isExist = await this.clienteRepository.findOne({where: {nit: createClienteDto.nit}})
    if (isExist) {
      throw new ConflictException('EL nit ingresado ya está registrado')
    }
    const cliente = this.clienteRepository.create(createClienteDto)
    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: string) {
    const cliente = await this.clienteRepository.findOneBy({id});
    if (!cliente) {
      throw new NotFoundException('El cliente no existe');
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      id,
      ...updateClienteDto
    })
    if (!cliente) {
      throw new NotFoundException('El cliente no existe');
    }
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: string) {
    const cliente = await this.clienteRepository.delete(id)
    if (cliente.affected === 0) {
      throw new NotFoundException('El cliente no existe');
    }
    return {message: 'Cliente eliminado correctamente'}
  }
}
