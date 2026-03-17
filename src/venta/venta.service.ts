import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventasRepository: Repository<Venta>
  ){}
  async create(createVentaDto: CreateVentaDto) {
    const venta = this.ventasRepository.create(createVentaDto)
    return await this.ventasRepository.save(venta);
  }

  async findAll() {
    const ventas = await this.ventasRepository.find();
    return ventas;
  }

  async findOne(id: string) {
    const venta = await this.ventasRepository.findOneBy({id});
    if (!venta) {
      throw new NotFoundException('No se encontró la venta');
    }
    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    const venta = await this.ventasRepository.preload({
      id,
      ...updateVentaDto
    })
    if (!venta) {
      throw new NotFoundException('No se encontró la venta');
    }
    return await this.ventasRepository.save(venta);
  }

  async remove(id: string) {
    const venta = await this.ventasRepository.delete(id);
    if (venta.affected === 0) {
       throw new NotFoundException('No se encontró la venta');
    }
    return {message: 'Venta eliminada exitosamente'}
  }
}
