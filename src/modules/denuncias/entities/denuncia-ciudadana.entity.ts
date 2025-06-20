import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from '../../core/entities/usuario.entity';
import { HistorialDenuncia } from './historial-denuncia.entity';

export enum EstadoDenuncia {
  RECIBIDA = 'Recibida',
  ASIGNADA = 'Asignada',
  EN_SOLUCION = 'En solución',
  RESUELTA = 'Resuelta',
  CERRADA = 'Cerrada'
}

export enum PrioridadDenuncia {
  BAJA = 'Baja',
  MEDIA = 'Media',
  ALTA = 'Alta',
  URGENTE = 'Urgente'
}

@Entity('denuncias_ciudadanas')
export class DenunciaCiudadana {
  @PrimaryGeneratedColumn('uuid')
  idDenuncia: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 50 })
  tipoDenuncia: string;

  @Column({ type: 'text' })
  descripcionDetallada: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  @Column({ type: 'text' })
  direccionProblema: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaDenuncia: Date;

  @Column({ 
    type: 'enum', 
    enum: EstadoDenuncia, 
    default: EstadoDenuncia.RECIBIDA 
  })
  estadoDenuncia: EstadoDenuncia;

  @Column({ 
    type: 'enum', 
    enum: PrioridadDenuncia, 
    default: PrioridadDenuncia.MEDIA 
  })
  prioridad: PrioridadDenuncia;

  @Column({ type: 'int', nullable: true })
  idUsuarioReporta: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  emailContacto: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefonoContacto: string;

  @Column({ type: 'boolean', default: false })
  recibirWhatsAppUpdates: boolean;

  @Column({ type: 'text', nullable: true })
  notasInternas: string;

  @Column({ type: 'jsonb', nullable: true })
  adjuntosURLs: string[];

  @Column({ type: 'varchar', length: 100, nullable: true })
  departamentoAsignado: string;

  @Column({ type: 'int', nullable: true })
  idTecnicoAsignado: number;

  @Column({ type: 'timestamp', nullable: true })
  fechaAsignacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaInicioInvestigacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaResolucion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaCierre: Date;

  // Relaciones
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioReporta' })
  usuarioReporta: Usuario;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idTecnicoAsignado' })
  tecnicoAsignado: Usuario;

  @OneToMany(() => HistorialDenuncia, historial => historial.denuncia)
  historial: HistorialDenuncia[];
} 