import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

export enum TipoMantenimiento {
  REEMPLAZO_BATERIA = 'Reemplazo de batería',
  ACTUALIZACION_FIRMWARE = 'Actualización de firmware',
  INSTALACION_INICIAL = 'Instalación inicial',
  REVISION_PROGRAMADA = 'Revisión programada',
  REPARACION = 'Reparación',
  REEMPLAZO = 'Reemplazo'
}

@Entity('mantenimientos_dispositivo')
export class MantenimientoDispositivo {
  @PrimaryGeneratedColumn('uuid')
  idMantenimiento: string;

  @Column({ type: 'varchar' })
  idDispositivo: string;

  @Column({ type: 'timestamp' })
  fechaMantenimiento: Date;

  @Column({ 
    type: 'enum', 
    enum: TipoMantenimiento 
  })
  tipoMantenimiento: TipoMantenimiento;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'int' })
  duracionMinutos: number;

  @Column({ type: 'int', nullable: true })
  realizadoPorUsuario: number;

  @Column({ type: 'boolean', default: false })
  realizadoPorSistema: boolean;

  @Column({ type: 'text', nullable: true })
  notasInternas: string;

  @Column({ type: 'date', nullable: true })
  proximoMantenimientoFecha: Date;

  @Column({ type: 'text', nullable: true })
  proximoMantenimientoDescripcion: string;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.mantenimientos)
  @JoinColumn({ name: 'idDispositivo' })
  dispositivo: Dispositivo;

  @ManyToOne('Usuario', 'idUsuario')
  @JoinColumn({ name: 'realizadoPorUsuario' })
  usuario: any;
} 