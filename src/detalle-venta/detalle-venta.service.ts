import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetalleVentaService {
  constructor(
  @InjectRepository(DetalleVenta)
  private readonly detalleRepository: Repository<DetalleVenta>
  ){}  
  async create(createDetalleVentaDto: CreateDetalleVentaDto) {
    const total = createDetalleVentaDto.cantidad * createDetalleVentaDto.precio_unitario
    const detalle = this.detalleRepository.create({
      ...createDetalleVentaDto,
      total
    })
    return await this.detalleRepository.save(detalle);
  }

  async findAll() {
    const detalle = await this.detalleRepository.find();
    return detalle;
  }

  async findOne(id: string) {
    const detalle = await this.detalleRepository.findOneBy({id});
    if (!detalle) {
      throw new NotFoundException('No se encontró el detalle');
    }
    return detalle;
  }

async update(id: string, updateDetalleVentaDto: UpdateDetalleVentaDto) {

  const detalle = await this.detalleRepository.preload({
    id,
    ...updateDetalleVentaDto,
    total: updateDetalleVentaDto.cantidad! * updateDetalleVentaDto.precio_unitario!
  });

  if (!detalle) {
    throw new NotFoundException('No se encontró el detalle');
  }

  return await this.detalleRepository.save(detalle);
}

  async remove(id: string) {
    const detalle = await this.detalleRepository.delete(id)
    if (detalle.affected === 0) {
      throw new NotFoundException('No se encontró el detalle');
    }
    return { message: 'Detalle eliminado exitosamente'}
  }
}
