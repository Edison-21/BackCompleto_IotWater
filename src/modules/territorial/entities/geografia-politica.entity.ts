import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Sector } from './sector.entity';
import { ResumenConsumoHistorico } from './resumen-consumo-historico.entity';

export enum TipoGeografia {
  PROVINCIA = 'Provincia',
  CANTON = 'Canton',
  PARROQUIA = 'Parroquia',
  ZONA_ADMINISTRATIVA = 'ZonaAdministrativa'
}

export enum TipoParroquia {
  URBANA = 'Urbana',
  RURAL = 'Rural'
}

@Entity('geografia_politica')
export class GeografiaPolitica {
  @PrimaryGeneratedColumn()
  idGeografia: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ 
    type: 'enum', 
    enum: TipoGeografia 
  })
  tipo: TipoGeografia;

  @Column({ type: 'int', nullable: true })
  idPadre: number;

  @Column({ 
    type: 'enum', 
    enum: TipoParroquia, 
    nullable: true 
  })
  tipoParroquia: TipoParroquia;

  @Column({ type: 'text', nullable: true })
  geometria: string;

  // Relaciones
  @ManyToOne(() => GeografiaPolitica, geo => geo.hijos)
  @JoinColumn({ name: 'idPadre' })
  padre: GeografiaPolitica;

  @OneToMany(() => GeografiaPolitica, geo => geo.padre)
  hijos: GeografiaPolitica[];

  @OneToMany(() => Sector, sector => sector.geografiaPadre)
  sectores: Sector[];

  @OneToMany(() => ResumenConsumoHistorico, resumen => resumen.geografia)
  resumenesConsumo: ResumenConsumoHistorico[];
} 