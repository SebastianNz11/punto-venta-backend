import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {
   constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>
   ){}

  async create(createProductoDto: CreateProductoDto) {
    const isExist = await this.productoRepository.findOne({where: {nombre: createProductoDto.nombre}})
    if (isExist) {
      throw new ConflictException('El producto ya existe');
    }
    const product = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(product);
  }

  async findAll() {
    const products = await this.productoRepository.find()
    return products;
  }

  async findOne(id: string) {
    const product = await this.productoRepository.findOneBy({id});
    if (!product) {
      throw new NotFoundException('No se encontró el producto');
    }
    return product;
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    const product = await this.productoRepository.preload({
      id,
      ...updateProductoDto
    });
    if (!product) {
      throw new NotFoundException('No se encontró el producto');
    }
    return await this.productoRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.productoRepository.delete(id);
    if (product.affected === 0) {
      throw new NotFoundException('El producto no existe');
    }
    return {message: 'Producto eliminado exitosamente'}
  }
}
