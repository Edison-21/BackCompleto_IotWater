import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GeografiaPolitica } from './geografia-politica.entity';

export enum TipoAgregacion {
  DIARIO = 'Diario',
  MENSUAL = 'Mensual',
  ANUAL = 'Anual'
}

@Entity('resumen_consumo_historico')
export class ResumenConsumoHistorico {
  @PrimaryGeneratedColumn('uuid')
  idResumen: string;

  @Column({ type: 'int' })
  idGeografia: number;

  @Column({ 
    type: 'enum', 
    enum: TipoAgregacion 
  })
  tipoAgregacion: TipoAgregacion;

  @Column({ type: 'date' })
  fechaAgregacion: Date;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  consumoTotalM3: number;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  consumoPromedioM3: number;

  @Column({ type: 'int' })
  numMedidoresActivos: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  variacionPorcentualMesAnterior: number;

  @ManyToOne(() => GeografiaPolitica, geo => geo.resumenesConsumo)
  @JoinColumn({ name: 'idGeografia' })
  geografia: GeografiaPolitica;
} 