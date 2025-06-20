import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { EstadoUsuario } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @ApiProperty({ description: 'ID único del empleado', example: 'EMP001' })
  @IsString()
  idEmpleado: string;

  @ApiProperty({ description: 'Nombre del usuario', example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario', example: 'Pérez' })
  @IsString()
  apellido: string;

  @ApiProperty({ description: 'Email del usuario', example: 'juan.perez@empresa.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del usuario', example: '+593991234567' })
  @IsString()
  telefono: string;

  @ApiProperty({ description: 'ID del departamento', example: 1 })
  @IsNumber()
  idDepartamento: number;

  @ApiProperty({ description: 'Posición del usuario', example: 'Técnico de Campo' })
  @IsString()
  posicion: string;

  @ApiProperty({ description: 'Fecha de ingreso', example: '2024-01-15' })
  @IsDateString()
  fechaIngreso: string;

  @ApiProperty({ description: 'Ubicación del usuario', example: 'Quito Norte' })
  @IsString()
  ubicacion: string;

  @ApiProperty({ 
    description: 'Estado del usuario', 
    enum: EstadoUsuario, 
    example: EstadoUsuario.ACTIVO 
  })
  @IsEnum(EstadoUsuario)
  estado: EstadoUsuario;

  @ApiProperty({ description: 'URL del avatar', required: false })
  @IsOptional()
  @IsString()
  avatarURL?: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsString()
  password: string;
}

export class UpdateUsuarioDto {
  @ApiProperty({ description: 'Nombre del usuario', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ description: 'Apellido del usuario', required: false })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiProperty({ description: 'Email del usuario', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Teléfono del usuario', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ description: 'ID del departamento', required: false })
  @IsOptional()
  @IsNumber()
  idDepartamento?: number;

  @ApiProperty({ description: 'Posición del usuario', required: false })
  @IsOptional()
  @IsString()
  posicion?: string;

  @ApiProperty({ description: 'Ubicación del usuario', required: false })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiProperty({ 
    description: 'Estado del usuario', 
    enum: EstadoUsuario, 
    required: false 
  })
  @IsOptional()
  @IsEnum(EstadoUsuario)
  estado?: EstadoUsuario;

  @ApiProperty({ description: 'URL del avatar', required: false })
  @IsOptional()
  @IsString()
  avatarURL?: string;
}

export class UsuarioResponseDto {
  @ApiProperty({ description: 'ID del usuario' })
  idUsuario: number;

  @ApiProperty({ description: 'ID del empleado' })
  idEmpleado: string;

  @ApiProperty({ description: 'Nombre del usuario' })
  nombre: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  apellido: string;

  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @ApiProperty({ description: 'Teléfono del usuario' })
  telefono: string;

  @ApiProperty({ description: 'ID del departamento' })
  idDepartamento: number;

  @ApiProperty({ description: 'Posición del usuario' })
  posicion: string;

  @ApiProperty({ description: 'Fecha de ingreso' })
  fechaIngreso: Date;

  @ApiProperty({ description: 'Ubicación del usuario' })
  ubicacion: string;

  @ApiProperty({ description: 'Estado del usuario' })
  estado: EstadoUsuario;

  @ApiProperty({ description: 'URL del avatar' })
  avatarURL: string;

  @ApiProperty({ description: 'Fecha de creación' })
  fechaCreacion: Date;

  @ApiProperty({ description: 'Fecha del último login' })
  fechaUltimoLogin: Date;
} 