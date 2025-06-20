import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Incidente,
  BitacoraIncidente,
  EquipoTecnico,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Incidente,
      BitacoraIncidente,
      EquipoTecnico,
    ]),
  ],
})
export class IncidentesModule {} 