import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';
import { Usuario } from '../../core/entities/usuario.entity';

export enum TipoEventoDispositivo {
  ALERTA = 'Alerta',
  COMUNICACION = 'Comunicacion',
  CONFIGURACION = 'Configuracion',
  ERROR = 'Error',
  RECONEXION = 'Reconexión',
  PERDIDA_SENAL = 'Pérdida de señal',
  REPORTE_PERIODICO = 'Reporte periódico'
}

export enum Origen {
  SISTEMA = 'Sistema',
  USUARIO = 'Usuario',
  DISPOSITIVO = 'Dispositivo'
}

@Entity('logs_tecnicos_dispositivo')
export class LogsTecnicosDispositivo {
  @PrimaryGeneratedColumn('uuid')
  idLog: string;

  @Column({ type: 'varchar' })
  idDispositivo: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ 
    type: 'enum', 
    enum: TipoEventoDispositivo 
  })
  tipoEvento: TipoEventoDispositivo;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'jsonb', nullable: true })
  detallesAdicionales: any;

  @Column({ 
    type: 'enum', 
    enum: Origen, 
    default: Origen.SISTEMA 
  })
  origen: Origen;

  @Column({ type: 'int', nullable: true })
  idUsuarioModificador: number;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.logsTecnicos)
  @JoinColumn({ name: 'idDispositivo' })
  dispositivo: Dispositivo;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioModificador' })
  usuarioModificador: Usuario;
} 