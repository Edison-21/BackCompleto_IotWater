import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GeografiaPolitica } from './geografia-politica.entity';

@Entity('sectores')
export class Sector {
  @PrimaryGeneratedColumn()
  idSector: number;

  @Column({ type: 'varchar', length: 100 })
  nombreSector: string;

  @Column({ type: 'int' })
  idGeografiaPadre: number;

  @Column({ type: 'text', nullable: true })
  geometria: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  consumoPromedioM3Dia: number;

  @Column({ type: 'int', default: 0 })
  dispositivosEnSector: number;

  @Column({ type: 'int', default: 0 })
  dispositivosActivosEnSector: number;

  @Column({ type: 'int', default: 0 })
  dispositivosConAlertasEnSector: number;

  @ManyToOne(() => GeografiaPolitica, geo => geo.sectores)
  @JoinColumn({ name: 'idGeografiaPadre' })
  geografiaPadre: GeografiaPolitica;
} 