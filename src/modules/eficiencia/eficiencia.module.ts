import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroPerdidas } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroPerdidas])],
})
export class EficienciaModule {} 