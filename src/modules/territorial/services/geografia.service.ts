import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeografiaPolitica, TipoGeografia } from '../entities/geografia-politica.entity';

@Injectable()
export class GeografiaService {
  private readonly logger = new Logger(GeografiaService.name);

  constructor(
    @InjectRepository(GeografiaPolitica)
    private readonly geografiaRepository: Repository<GeografiaPolitica>,
  ) {}

  async seedGeografia() {
    const count = await this.geografiaRepository.count();
    if (count === 0) {
      this.logger.log('No se encontraron geografías. Sembrando datos iniciales...');
      await this.geografiaRepository.save([
        { 
          idGeografia: 1,
          nombre: 'Provincia Principal',
          tipo: TipoGeografia.PROVINCIA,
          codigo: 'P'
        }
      ]);
      this.logger.log('Geografías iniciales creadas.');
    }
  }
} 