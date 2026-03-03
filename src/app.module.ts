import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ClienteModule,ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT!),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false
      }
  }), ProductoModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
