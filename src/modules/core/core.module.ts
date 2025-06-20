import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Departamento,
  Permiso,
  RegistroActividadUsuario,
  Rol,
  RolPermiso,
  Usuario,
  UsuarioRol,
} from './entities';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Departamento,
      Permiso,
      RegistroActividadUsuario,
      Rol,
      RolPermiso,
      Usuario,
      UsuarioRol,
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class CoreModule {}
