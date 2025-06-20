import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from '../../core/entities/usuario.entity';
import { Dispositivo } from '../../dispositivos/entities/dispositivo.entity';
import { BitacoraIncidente } from './bitacora-incidente.entity';

export enum PrioridadIncidente {
  CRITICO = 'Crítico',
  ALTO = 'Alto',
  MEDIO = 'Medio',
  BAJO = 'Bajo'
}

export enum EstadoIncidente {
  NUEVO = 'Nuevo',
  ASIGNADO = 'Asignado',
  EN_PROGRESO = 'En Progreso',
  RESUELTO = 'Resuelto',
  CERRADO = 'Cerrado'
}

export enum EstadoDisponibilidad {
  DISPONIBLE = 'Disponible',
  OCUPADO = 'Ocupado',
  AUSENTE = 'Ausente'
}

@Entity('incidentes')
export class Incidente {
  @PrimaryGeneratedColumn('uuid')
  idIncidente: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descripcionDetallada: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaReporte: Date;

  @Column({ type: 'int' })
  idUsuarioReporta: number;

  @Column({ 
    type: 'enum', 
    enum: PrioridadIncidente, 
    default: PrioridadIncidente.MEDIO 
  })
  prioridad: PrioridadIncidente;

  @Column({ 
    type: 'enum', 
    enum: EstadoIncidente, 
    default: EstadoIncidente.NUEVO 
  })
  estadoIncidente: EstadoIncidente;

  @Column({ type: 'varchar', length: 50 })
  categoria: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  departamentoAfectado: string;

  @Column({ type: 'varchar', nullable: true })
  idDispositivoAfectado: string;

  @Column({ type: 'int', nullable: true })
  idTecnicoAsignado: number;

  @Column({ type: 'timestamp', nullable: true })
  fechaAsignacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaResolucionEstimada: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaResolucionReal: Date;

  @Column({ type: 'jsonb', nullable: true })
  adjuntosURLs: string[];

  @Column({ type: 'boolean', default: true })
  notificarUsuarioReporta: boolean;

  @Column({ type: 'boolean', default: true })
  notificarEquipoTecnico: boolean;

  @Column({ type: 'boolean', default: false })
  notificarSupervisores: boolean;

  @Column({ type: 'text', nullable: true })
  mensajeNotificacionPersonalizado: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  // Relaciones
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioReporta' })
  usuarioReporta: Usuario;

  @ManyToOne(() => Dispositivo)
  @JoinColumn({ name: 'idDispositivoAfectado' })
  dispositivoAfectado: Dispositivo;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idTecnicoAsignado' })
  tecnicoAsignado: Usuario;

  @OneToMany(() => BitacoraIncidente, bitacora => bitacora.incidente)
  bitacora: BitacoraIncidente[];
} 