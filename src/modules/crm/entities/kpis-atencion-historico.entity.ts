import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('kpis_atencion_historico')
export class KPIsAtencionHistorico {
  @PrimaryColumn({ type: 'date' })
  fecha: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tiempoPromedioRespuesta: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  casosResueltosPrimeraRespuestaPct: number;

  @Column({ type: 'int' })
  netPromoterScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  satisfaccionClientePct: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  resolucionAutomaticaPct: number;

  @Column({ type: 'int' })
  casosResolucionAutomaticaTotal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  precisionRespuestasChatbotPct: number;
} 