import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from '../entities/sector.entity';

@Injectable()
export class TerritorialService {
  private readonly logger = new Logger(TerritorialService.name);

  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}

  async seedSectores() {
    const count = await this.sectorRepository.count();
    if (count === 0) {
      this.logger.log('No se encontraron sectores. Sembrando datos iniciales...');
      await this.sectorRepository.save([
        { 
          idSector: 1, 
          nombreSector: 'Sector Norte', 
          idGeografiaPadre: 1, // Asumimos que existe una geografia con ID 1
        },
        { 
          idSector: 2, 
          nombreSector: 'Sector Sur', 
          idGeografiaPadre: 1, 
        }
      ]);
      this.logger.log('Sectores iniciales creados.');
    } else {
      this.logger.log('La tabla de sectores ya contiene datos. No se requiere siembra.');
    }
  }
} 