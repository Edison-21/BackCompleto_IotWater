import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Gateway,
  Dispositivo,
  DatosConsumoAgua,
  MantenimientoDispositivo,
  LogsTecnicosDispositivo,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gateway,
      Dispositivo,
      DatosConsumoAgua,
      MantenimientoDispositivo,
      LogsTecnicosDispositivo,
    ]),
  ],
  providers: [],
  controllers: [],
})
export class DispositivosModule {} 