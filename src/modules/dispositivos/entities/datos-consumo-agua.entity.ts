import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from './dispositivo.entity';

export enum EstadoLectura {
  NORMAL = 'Normal',
  ANOMALIA = 'Anomalía',
  MISSING = 'Missing'
}

@Entity('datos_consumo_agua')
export class DatosConsumoAgua {
  @PrimaryGeneratedColumn('uuid')
  idLectura: string;

  @Column({ type: 'varchar' })
  idDispositivo: string;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'float' })
  consumoM3: number;

  @Column({ type: 'varchar', length: 10, default: 'm³' })
  unidad: string;

  @Column({ 
    type: 'enum', 
    enum: EstadoLectura, 
    default: EstadoLectura.NORMAL 
  })
  estadoLectura: EstadoLectura;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.datosConsumo)
  @JoinColumn({ name: 'idDispositivo' })
  dispositivo: Dispositivo;
} 