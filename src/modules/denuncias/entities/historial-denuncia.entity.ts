import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DenunciaCiudadana } from './denuncia-ciudadana.entity';
import { Usuario } from '../../core/entities/usuario.entity';

export enum TipoEventoDenuncia {
  DENUNCIA_RECIBIDA = 'Denuncia recibida',
  DENUNCIA_ASIGNADA = 'Denuncia asignada',
  EN_PROCESO_SOLUCION = 'En proceso de solución',
  DENUNCIA_RESUELTA = 'Denuncia resuelta',
  COMENTARIO = 'Comentario',
  ADJUNTO = 'Adjunto'
}

@Entity('historial_denuncia')
export class HistorialDenuncia {
  @PrimaryGeneratedColumn('uuid')
  idHistorial: string;

  @Column({ type: 'varchar' })
  idDenuncia: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCambio: Date;

  @Column({ 
    type: 'enum', 
    enum: TipoEventoDenuncia 
  })
  tipoEvento: TipoEventoDenuncia;

  @Column({ type: 'text' })
  descripcionEvento: string;

  @Column({ type: 'int', nullable: true })
  idUsuarioResponsable: number;

  @Column({ type: 'jsonb', nullable: true })
  adjuntosEventoURLs: string[];

  @ManyToOne(() => DenunciaCiudadana, denuncia => denuncia.historial)
  @JoinColumn({ name: 'idDenuncia' })
  denuncia: DenunciaCiudadana;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'idUsuarioResponsable' })
  usuarioResponsable: Usuario;
} 