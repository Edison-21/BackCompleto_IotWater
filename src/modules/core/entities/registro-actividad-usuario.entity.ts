import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('registros_actividad_usuario')
export class RegistroActividadUsuario {
  @PrimaryGeneratedColumn()
  idRegistro: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'varchar', length: 100 })
  tipoActividad: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
} 