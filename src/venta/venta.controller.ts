import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

@UseGuards(AuthGuard('jwt'))
@Post()
create(
  @Body() createVentaDto: CreateVentaDto,
  @Req() req
) {
  return this.ventaService.create({
    ...createVentaDto,
    usuarioId: req.user.id
  });
}

  @Get()
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseUUIDPipe) id: string) {
    return this.ventaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(id, updateVentaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ventaService.remove(id);
  }
}
