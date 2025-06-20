import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({
    description: 'El nombre único del rol.',
    example: 'Administrador',
  })
  @IsString()
  @IsNotEmpty()
  nombreRol: string;

  @ApiProperty({
    description: 'Una descripción detallada de lo que hace el rol.',
    example: 'Tiene acceso a todas las funcionalidades del sistema.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'Un nivel numérico de acceso (ej. 1 para más alto, 5 para más bajo).',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Max(99)
  @IsNotEmpty()
  nivelAccesoGeneral: number;
} 