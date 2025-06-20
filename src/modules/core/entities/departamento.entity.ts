import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn()
  idDepartamento: number;

  @Column({ type: 'varchar', length: 100 })
  nombreDepartamento: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @OneToMany(() => Usuario, usuario => usuario.departamento)
  usuarios: Usuario[];
} 