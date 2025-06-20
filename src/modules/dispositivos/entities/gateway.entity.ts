import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

export enum EstadoGateway {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  FALLA = 'Falla',
  EN_MANTENIMIENTO = 'En Mantenimiento'
}

@Entity('gateways')
export class Gateway {
  @PrimaryGeneratedColumn('uuid')
  idGateway: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  numeroSerie: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'text' })
  ubicacion: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  @Column({ type: 'date' })
  fechaInstalacion: Date;

  @Column({ 
    type: 'enum', 
    enum: EstadoGateway, 
    default: EstadoGateway.OFFLINE 
  })
  estado: EstadoGateway;

  @Column({ type: 'timestamp', nullable: true })
  ultimaComunicacion: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  versionFirmware: string;

  @OneToMany(() => Dispositivo, dispositivo => dispositivo.gatewayPrincipal)
  dispositivos: Dispositivo[];
} 