import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { postgresDatabaseConfig, mongoDatabaseConfig } from './config/database';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './shared/guards';
import { DispositivosModule } from './modules/dispositivos/dispositivos.module';
import { TerritorialModule } from './modules/territorial/territorial.module';
import { CrmModule } from './modules/crm/crm.module';
import { DenunciasModule } from './modules/denuncias/denuncias.module';
import { IncidentesModule } from './modules/incidentes/incidentes.module';
import { EficienciaModule } from './modules/eficiencia/eficiencia.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(postgresDatabaseConfig()),
    MongooseModule.forRootAsync(mongoDatabaseConfig()),
    AuthModule,
    CoreModule,
    DispositivosModule,
    TerritorialModule,
    CrmModule,
    DenunciasModule,
    IncidentesModule,
    EficienciaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
