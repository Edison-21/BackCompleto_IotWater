import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioRol } from './usuario-rol.entity';
import { RolPermiso } from './rol-permiso.entity';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn()
  idRol: number;

  @Column({ type: 'varchar', length: 50 })
  nombreRol: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int' })
  nivelAccesoGeneral: number;

  @OneToMany(() => UsuarioRol, usuarioRol => usuarioRol.rol)
  usuarioRoles: UsuarioRol[];

  @OneToMany(() => RolPermiso, rolPermiso => rolPermiso.rol)
  rolPermisos: RolPermiso[];
} 