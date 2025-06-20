import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from './rol.entity';

@Entity('usuario_roles')
export class UsuarioRol {
  @PrimaryGeneratedColumn('uuid')
  idUsuarioRol: string;

  @Column({ type: 'int' })
  idUsuario: number;

  @Column({ type: 'int' })
  idRol: number;

  @Column({ type: 'date' })
  fechaAsignacion: Date;

  @ManyToOne(() => Usuario, usuario => usuario.usuarioRoles)
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @ManyToOne(() => Rol, rol => rol.usuarioRoles)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;
} 