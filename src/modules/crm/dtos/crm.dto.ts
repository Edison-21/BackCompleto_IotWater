import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';
import { PlataformaOrigen, PrioridadCRM } from '../entities';

export class CreateConversacionDto {
  @ApiProperty({ description: 'ID del cliente que inicia la conversación.', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  @IsString()
  @IsNotEmpty()
  idCliente: string;

  @ApiProperty({ enum: PlataformaOrigen, description: 'La plataforma desde donde se origina la conversación.', example: PlataformaOrigen.WHATSAPP })
  @IsEnum(PlataformaOrigen)
  @IsNotEmpty()
  plataformaOrigen: PlataformaOrigen;
  
  @ApiProperty({ description: 'Asunto o primer mensaje de la conversación.', example: 'Problemas con mi medidor' })
  @IsString()
  @IsNotEmpty()
  asunto: string;

  @ApiProperty({ enum: PrioridadCRM, description: 'Prioridad de la conversación.', example: PrioridadCRM.MEDIA, required: false })
  @IsEnum(PrioridadCRM)
  @IsOptional()
  prioridad?: PrioridadCRM;
}

export class CreateMensajeDto {
    @ApiProperty({ description: 'Contenido del mensaje.', example: 'Hola, necesito ayuda.'})
    @IsString()
    @IsNotEmpty()
    contenido: string;

    @ApiProperty({ description: 'ID del cliente que envía el mensaje (si aplica).', required: false })
    @IsInt()
    @IsOptional()
    idClienteRemitente?: number;
    
    @ApiProperty({ description: 'ID del agente que envía el mensaje (si aplica).', required: false })
    @IsInt()
    @IsOptional()
    idUsuarioRemitente?: number;
} 