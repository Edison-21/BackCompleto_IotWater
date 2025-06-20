import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../core/entities/usuario.entity';

@Entity('entrenamiento_modelo_ia')
export class EntrenamientoModeloIA {
  @PrimaryGeneratedColumn('uuid')
  idEntrenamiento: string;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'date' })
  fechaContribucion: Date;

  @Column({ type: 'varchar', length: 100 })
  tipoContribucion: string;

  @Column({ type: 'int' })
  numeroInteracciones: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  mejoraPorcentaje: number;

  @Column({ type: 'varchar', length: 20 })
  versionModeloIA: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
} 