import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolPermiso } from './rol-permiso.entity';

@Entity('permisos')
export class Permiso {
  @PrimaryGeneratedColumn()
  idPermiso: number;

  @Column({ type: 'varchar', length: 100 })
  nombrePermiso: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => RolPermiso, rolPermiso => rolPermiso.permiso)
  rolPermisos: RolPermiso[];
} 