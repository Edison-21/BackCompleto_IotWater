import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './rol.entity';
import { Permiso } from './permiso.entity';

@Entity('rol_permisos')
export class RolPermiso {
  @PrimaryGeneratedColumn('uuid')
  idRolPermiso: string;

  @Column({ type: 'int' })
  idRol: number;

  @Column({ type: 'int' })
  idPermiso: number;

  @Column({ type: 'boolean', default: true })
  habilitado: boolean;

  @ManyToOne(() => Rol, rol => rol.rolPermisos)
  @JoinColumn({ name: 'idRol' })
  rol: Rol;

  @ManyToOne(() => Permiso, permiso => permiso.rolPermisos)
  @JoinColumn({ name: 'idPermiso' })
  permiso: Permiso;
} 