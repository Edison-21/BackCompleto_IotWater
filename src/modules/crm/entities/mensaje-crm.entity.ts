import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ConversacionCRM } from './conversacion-crm.entity';
import { Cliente } from './cliente.entity';
import { Usuario } from '../../core/entities/usuario.entity';

export enum TipoRemitente {
  CLIENTE = 'Cliente',
  AGENTE = 'Agente',
  CHATBOT = 'Chatbot'
}

@Entity('mensajes_crm')
export class MensajeCRM {
  @PrimaryGeneratedColumn('uuid')
  idMensaje: string;

  @Column({ type: 'varchar' })
  idConversacion: string;

  @Column({ 
    type: 'enum', 
    enum: TipoRemitente 
  })
  tipoRemitente: TipoRemitente;

  @Column({ type: 'int', nullable: true })
  idClienteRemitente: number;

  @Column({ type: 'int', nullable: true })
  idUsuarioRemitente: number;

  @Column({ type: 'text' })
  contenido: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaEnvio: Date;

  @Column({ type: 'jsonb', nullable: true })
  adjuntosURLs: string[];

  @Column({ type: 'boolean', default: false })
  leido: boolean;

  @Column({ type: 'boolean', default: false })
  enviadoPorChatbot: boolean;

  // Relaciones
  @ManyToOne(() => ConversacionCRM, conversacion => conversacion.mensajes)
  @JoinColumn({ name: 'idConversacion' })
  conversacion: ConversacionCRM;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'idClienteRemitente' })
  cliente: Cliente;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioRemitente' })
  usuario: Usuario;
} 