import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from '../../core/entities/usuario.entity';
import { MensajeCRM } from './mensaje-crm.entity';
import { InteraccionAgente } from './interaccion-agente.entity';

export enum PlataformaOrigen {
  WHATSAPP = 'WhatsApp',
  WEBCHAT = 'WebChat',
  TELEFONICO = 'Telefonico',
  EMAIL = 'Email'
}

export enum EstadoConversacion {
  NUEVO = 'Nuevo',
  EN_PROGRESO = 'En progreso',
  ESCALADO = 'Escalado',
  RESUELTO = 'Resuelto',
  CERRADO = 'Cerrado'
}

export enum PrioridadCRM {
  BAJA = 'Baja',
  MEDIA = 'Media',
  ALTA = 'Alta',
  URGENTE = 'Urgente'
}

@Entity('conversaciones_crm')
export class ConversacionCRM {
  @PrimaryGeneratedColumn('uuid')
  idConversacion: string;

  @Column({ type: 'varchar' })
  idCliente: string;

  @Column({ 
    type: 'enum', 
    enum: PlataformaOrigen 
  })
  plataformaOrigen: PlataformaOrigen;

  @Column({ type: 'varchar', length: 255 })
  asunto: string;

  @Column({ 
    type: 'enum', 
    enum: EstadoConversacion, 
    default: EstadoConversacion.NUEVO 
  })
  estadoConversacion: EstadoConversacion;

  @Column({ type: 'int', nullable: true })
  idAgenteAsignado: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaInicio: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaUltimaActividad: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaCierre: Date;

  @Column({ type: 'int', nullable: true })
  tiempoRespuestaInicialMin: number;

  @Column({ type: 'int', nullable: true })
  tiempoResolucionMin: number;

  @Column({ type: 'boolean', default: false })
  resueltoPrimeraRespuesta: boolean;

  @Column({ 
    type: 'enum', 
    enum: PrioridadCRM, 
    default: PrioridadCRM.MEDIA 
  })
  prioridad: PrioridadCRM;

  @Column({ type: 'jsonb', nullable: true })
  etiquetas: string[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  recategorizacion: string;

  // Relaciones
  @ManyToOne(() => Cliente, cliente => cliente.conversaciones)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idAgenteAsignado' })
  agenteAsignado: Usuario;

  @OneToMany(() => MensajeCRM, mensaje => mensaje.conversacion)
  mensajes: MensajeCRM[];

  @OneToMany(() => InteraccionAgente, interaccion => interaccion.conversacion)
  interacciones: InteraccionAgente[];
} 