import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Sector } from '../../territorial/entities/sector.entity';
import { ConversacionCRM } from './conversacion-crm.entity';
import { MensajeCRM } from './mensaje-crm.entity';
import * as CryptoJS from 'crypto-js';

export enum TipoCliente {
  RESIDENCIAL = 'Residencial',
  COMERCIAL = 'Comercial',
  INDUSTRIAL = 'Industrial'
}

export enum EstadoCuenta {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
  SUSPENDIDO = 'Suspendido',
  BLOQUEADO = 'Bloqueado'
}

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  idCliente: string;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  apellido: string;

  @Column({ type: 'text', unique: true })
  telefonoContacto: string;

  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Column({ type: 'text' })
  direccionServicio: string;

  @Column({ 
    type: 'enum', 
    enum: TipoCliente, 
    default: TipoCliente.RESIDENCIAL 
  })
  tipoCliente: TipoCliente;

  @Column({ type: 'int' })
  idSector: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numeroMedidorAsociado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ 
    type: 'enum', 
    enum: EstadoCuenta, 
    default: EstadoCuenta.ACTIVO 
  })
  estadoCuenta: EstadoCuenta;

  @Column({ type: 'varchar', length: 50, nullable: true })
  planServicio: string;

  // Relaciones
  @ManyToOne(() => Sector)
  @JoinColumn({ name: 'idSector' })
  sector: Sector;

  @OneToMany(() => ConversacionCRM, (conversacion: ConversacionCRM) => conversacion.cliente)
  conversaciones: ConversacionCRM[];

  @OneToMany(() => MensajeCRM, (mensaje: MensajeCRM) => mensaje.cliente)
  mensajes: MensajeCRM[];

  // Hooks para cifrar datos sensibles
  @BeforeInsert()
  @BeforeUpdate()
  cifrarDatosPersonales() {
    const secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';
    
    // Cifrar datos personales
    this.nombre = CryptoJS.AES.encrypt(this.nombre, secretKey).toString();
    this.apellido = CryptoJS.AES.encrypt(this.apellido, secretKey).toString();
    this.telefonoContacto = CryptoJS.AES.encrypt(this.telefonoContacto, secretKey).toString();
    if (this.email) {
      this.email = CryptoJS.AES.encrypt(this.email, secretKey).toString();
    }
    this.direccionServicio = CryptoJS.AES.encrypt(this.direccionServicio, secretKey).toString();
  }

  // Método para descifrar datos
  descifrarDatosPersonales() {
    const secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';
    
    try {
      this.nombre = CryptoJS.AES.decrypt(this.nombre, secretKey).toString(CryptoJS.enc.Utf8);
      this.apellido = CryptoJS.AES.decrypt(this.apellido, secretKey).toString(CryptoJS.enc.Utf8);
      this.telefonoContacto = CryptoJS.AES.decrypt(this.telefonoContacto, secretKey).toString(CryptoJS.enc.Utf8);
      if (this.email) {
        this.email = CryptoJS.AES.decrypt(this.email, secretKey).toString(CryptoJS.enc.Utf8);
      }
      this.direccionServicio = CryptoJS.AES.decrypt(this.direccionServicio, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error al descifrar datos del cliente:', error);
    }
  }
} 