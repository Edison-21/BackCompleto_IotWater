import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('registros_perdidas')
export class RegistroPerdidas {
  @PrimaryGeneratedColumn('uuid')
  idRegistroPerdida: string;

  @Column({ type: 'date' })
  fechaRegistro: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  porcentajePerdida: number;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  volumenPerdidaM3: number;

  @Column({ type: 'varchar', length: 100 })
  metodoEstimacion: string;

  @Column({ type: 'text', nullable: true })
  notas: string;
} 