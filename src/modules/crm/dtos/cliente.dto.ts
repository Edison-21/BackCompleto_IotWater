import { IsString, IsEmail, IsOptional, IsEnum, IsInt, IsDate, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { TipoCliente, EstadoCuenta } from '../entities/cliente.entity';

export class CreateClienteDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  apellido: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  telefonoContacto: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(100)
  email?: string;

  @IsString()
  @IsNotEmpty()
  direccionServicio: string;

  @IsEnum(TipoCliente)
  @IsOptional()
  tipoCliente?: TipoCliente;

  @IsInt()
  @IsNotEmpty()
  idSector: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  numeroMedidorAsociado?: string;

  @IsDate()
  @IsOptional()
  fechaRegistro?: Date;

  @IsEnum(EstadoCuenta)
  @IsOptional()
  estadoCuenta?: EstadoCuenta;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  planServicio?: string;
}

export class UpdateClienteDto extends PartialType(CreateClienteDto) {} 