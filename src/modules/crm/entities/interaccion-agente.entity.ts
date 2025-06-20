import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ConversacionCRM } from './conversacion-crm.entity';
import { Usuario } from '../../core/entities/usuario.entity';

export enum TipoInteraccion {
  ASIGNADO = 'Asignado',
  RESPUESTA = 'Respuesta',
  ESCALADO = 'Escalado',
  CIERRE = 'Cierre',
  TRANSFERENCIA = 'Transferencia'
}

@Entity('interacciones_agente')
export class InteraccionAgente {
  @PrimaryGeneratedColumn('uuid')
  idInteraccion: string;

  @Column({ type: 'varchar' })
  idConversacion: string;

  @Column({ type: 'int' })
  idAgente: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaInteraccion: Date;

  @Column({ 
    type: 'enum', 
    enum: TipoInteraccion 
  })
  tipoInteraccion: TipoInteraccion;

  @Column({ type: 'text', nullable: true })
  notasInternas: string;

  @ManyToOne(() => ConversacionCRM, conversacion => conversacion.interacciones)
  @JoinColumn({ name: 'idConversacion' })
  conversacion: ConversacionCRM;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idAgente' })
  agente: Usuario;
} 