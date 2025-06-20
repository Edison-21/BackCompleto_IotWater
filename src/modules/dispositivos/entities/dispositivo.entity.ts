import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Gateway } from './gateway.entity';
import { DatosConsumoAgua } from './datos-consumo-agua.entity';
import { MantenimientoDispositivo } from './mantenimiento-dispositivo.entity';
import { LogsTecnicosDispositivo } from './logs-tecnicos-dispositivo.entity';

export enum TipoDispositivo {
  MEDIDOR = 'Medidor',
  VALVULA = 'Válvula',
  SENSOR = 'Sensor'
}

export enum EstadoOperacional {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
  EN_REVISION = 'En revisión',
  REEMPLAZADO = 'Reemplazado',
  CONECTADO = 'Conectado',
  INESTABLE = 'Inestable',
  FALLA = 'Falla'
}

@Entity('dispositivos')
export class Dispositivo {
  @PrimaryGeneratedColumn('uuid')
  idDispositivo: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  numeroSerie: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ 
    type: 'enum', 
    enum: TipoDispositivo 
  })
  tipo: TipoDispositivo;

  @Column({ type: 'varchar', length: 50 })
  modelo: string;

  @Column({ type: 'varchar', length: 100 })
  fabricante: string;

  @Column({ type: 'date' })
  fechaInstalacion: Date;

  @Column({ 
    type: 'enum', 
    enum: EstadoOperacional, 
    default: EstadoOperacional.INACTIVO 
  })
  estadoOperacional: EstadoOperacional;

  @Column({ type: 'timestamp', nullable: true })
  ultimaComunicacion: Date;

  @Column({ type: 'int', default: 0 })
  nivelBateria: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  senalLoRa: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  versionFirmware: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  umbralAlerta: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  frecuenciaReporte: string;

  @Column({ type: 'jsonb', nullable: true })
  configuracionPersonalizada: any;

  @Column({ type: 'boolean', default: false })
  bajoMonitoreo: boolean;

  @Column({ type: 'varchar', nullable: true })
  idGatewayPrincipal: string;

  @Column({ type: 'int', nullable: true })
  idClienteAsociado: number;

  @Column({ type: 'int', nullable: true })
  idSector: number;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  // Relaciones
  @ManyToOne(() => Gateway, gateway => gateway.dispositivos)
  @JoinColumn({ name: 'idGatewayPrincipal' })
  gatewayPrincipal: Gateway;

  @OneToMany(() => DatosConsumoAgua, datos => datos.dispositivo)
  datosConsumo: DatosConsumoAgua[];

  @OneToMany(() => MantenimientoDispositivo, mantenimiento => mantenimiento.dispositivo)
  mantenimientos: MantenimientoDispositivo[];

  @OneToMany(() => LogsTecnicosDispositivo, log => log.dispositivo)
  logsTecnicos: LogsTecnicosDispositivo[];
} 