import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DenunciaCiudadana, HistorialDenuncia } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([DenunciaCiudadana, HistorialDenuncia])],
})
export class DenunciasModule {} 