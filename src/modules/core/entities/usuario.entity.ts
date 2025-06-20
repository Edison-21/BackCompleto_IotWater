import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Departamento } from './departamento.entity';
import { UsuarioRol } from './usuario-rol.entity';
import { RegistroActividadUsuario } from './registro-actividad-usuario.entity';
import * as CryptoJS from 'crypto-js';

export enum EstadoUsuario {
  ACTIVO = 'Activo',
  INACTIVO = 'Inactivo',
  SUSPENDIDO = 'Suspendido',
  VACACIONES = 'Vacaciones'
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  idEmpleado: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @Column({ type: 'int', nullable: true })
  idDepartamento: number;

  @Column({ type: 'varchar', length: 100 })
  posicion: string;

  @Column({ type: 'date' })
  fechaIngreso: Date;

  @Column({ type: 'varchar', length: 100 })
  ubicacion: string;

  @Column({ 
    type: 'enum', 
    enum: EstadoUsuario, 
    default: EstadoUsuario.ACTIVO 
  })
  estado: EstadoUsuario;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarURL: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaUltimoLogin: Date;

  // Relaciones
  @ManyToOne(() => Departamento, departamento => departamento.usuarios)
  @JoinColumn({ name: 'idDepartamento' })
  departamento: Departamento;

  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.usuario)
  usuarioRoles: UsuarioRol[];

  @OneToMany(() => RegistroActividadUsuario, registro => registro.usuario)
  registrosActividad: RegistroActividadUsuario[];

  // Hooks para cifrar datos sensibles
  @BeforeInsert()
  @BeforeUpdate()
  cifrarDatosPersonales() {
    const secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';
    
    // Cifrar datos personales
    this.nombre = CryptoJS.AES.encrypt(this.nombre, secretKey).toString();
    this.apellido = CryptoJS.AES.encrypt(this.apellido, secretKey).toString();
    this.email = CryptoJS.AES.encrypt(this.email, secretKey).toString();
    this.telefono = CryptoJS.AES.encrypt(this.telefono, secretKey).toString();
    this.idEmpleado = CryptoJS.AES.encrypt(this.idEmpleado, secretKey).toString();
  }

  // Método para descifrar datos
  descifrarDatosPersonales() {
    const secretKey = process.env.ENCRYPTION_KEY || 'default-secret-key';
    
    try {
      this.nombre = CryptoJS.AES.decrypt(this.nombre, secretKey).toString(CryptoJS.enc.Utf8);
      this.apellido = CryptoJS.AES.decrypt(this.apellido, secretKey).toString(CryptoJS.enc.Utf8);
      this.email = CryptoJS.AES.decrypt(this.email, secretKey).toString(CryptoJS.enc.Utf8);
      this.telefono = CryptoJS.AES.decrypt(this.telefono, secretKey).toString(CryptoJS.enc.Utf8);
      this.idEmpleado = CryptoJS.AES.decrypt(this.idEmpleado, secretKey).toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error al descifrar datos:', error);
    }
  }
} 