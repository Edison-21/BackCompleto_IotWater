import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Incidente } from './incidente.entity';
import { Usuario } from '../../core/entities/usuario.entity';

export enum TipoAccion {
  REPORTE = 'Reporte',
  ASIGNACION = 'Asignacion',
  CAMBIO_PRIORIDAD = 'CambioPrioridad',
  CAMBIO_ESTADO = 'CambioEstado',
  COMENTARIO = 'Comentario',
  ADJUNTO = 'Adjunto',
  RESOLUCION = 'Resolucion'
}

@Entity('bitacora_incidente')
export class BitacoraIncidente {
  @PrimaryGeneratedColumn('uuid')
  idBitacora: string;

  @Column({ type: 'varchar' })
  idIncidente: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'int' })
  idUsuarioAccion: number;

  @Column({ 
    type: 'enum', 
    enum: TipoAccion 
  })
  tipoAccion: TipoAccion;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'jsonb', nullable: true })
  adjuntosURLs: string[];

  @ManyToOne(() => Incidente, incidente => incidente.bitacora)
  @JoinColumn({ name: 'idIncidente' })
  incidente: Incidente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioAccion' })
  usuarioAccion: Usuario;
} 