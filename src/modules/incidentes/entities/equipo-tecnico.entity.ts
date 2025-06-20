import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../core/entities/usuario.entity';

export enum EstadoDisponibilidadTecnico {
  DISPONIBLE = 'Disponible',
  OCUPADO = 'Ocupado',
  AUSENTE = 'Ausente'
}

@Entity('equipo_tecnico')
export class EquipoTecnico {
  @PrimaryColumn({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'varchar', length: 100 })
  especialidad: string;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  calificacionPromedio: number;

  @Column({ type: 'int', default: 0 })
  añosExperiencia: number;

  @Column({ 
    type: 'enum', 
    enum: EstadoDisponibilidadTecnico, 
    default: EstadoDisponibilidadTecnico.DISPONIBLE 
  })
  estadoDisponibilidad: EstadoDisponibilidadTecnico;

  @Column({ type: 'boolean', default: true })
  puedeSerAsignado: boolean;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;
} 