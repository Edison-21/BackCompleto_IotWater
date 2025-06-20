import { Module } from '@nestjs/common';
import { CrmController } from './controllers/crm.controller';
import { CrmService } from './services/crm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ConversacionCRM } from './entities/conversacion-crm.entity';
import { EntrenamientoModeloIA } from './entities/entrenamiento-modelo-ia.entity';
import { InteraccionAgente } from './entities/interaccion-agente.entity';
import { KPIsAtencionHistorico } from './entities/kpis-atencion-historico.entity';
import { MensajeCRM } from './entities/mensaje-crm.entity';
import { ClienteService } from './services/cliente.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      ConversacionCRM,
      EntrenamientoModeloIA,
      InteraccionAgente,
      KPIsAtencionHistorico,
      MensajeCRM
    ])
  ],
  controllers: [CrmController],
  providers: [CrmService, ClienteService]
})
export class CrmModule {} 