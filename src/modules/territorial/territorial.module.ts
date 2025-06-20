import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeografiaPolitica } from './entities/geografia-politica.entity';
import { ResumenConsumoHistorico } from './entities/resumen-consumo-historico.entity';
import { Sector } from './entities/sector.entity';
import { TerritorialService } from './services/territorial.service';
import { GeografiaService } from './services/geografia.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GeografiaPolitica,
      ResumenConsumoHistorico,
      Sector
    ])
  ],
  providers: [TerritorialService, GeografiaService],
  exports: [TerritorialService, GeografiaService],
})
export class TerritorialModule {} 