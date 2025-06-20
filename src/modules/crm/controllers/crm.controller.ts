import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards, Put, Delete } from '@nestjs/common';
import { CrmService } from '../services/crm.service';
import { CreateConversacionDto, CreateMensajeDto } from '../dtos/crm.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AtGuard } from '../../../shared/guards';
import { ClienteService } from '../services/cliente.service';
import { CreateClienteDto, UpdateClienteDto } from '../dtos';

@ApiTags('CRM')
@Controller('crm')
@UseGuards(AtGuard)
@ApiBearerAuth()
export class CrmController {
  constructor(
    private readonly crmService: CrmService,
    private readonly clienteService: ClienteService
  ) {}

  // =================================================================================================
  // Endpoints para Clientes
  // =================================================================================================

  @Post('clientes')
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'El cliente ha sido creado exitosamente.'})
  @ApiResponse({ status: 400, description: 'Datos inválidos.'})
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get('clientes')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes.'})
  findAllClientes() {
    return this.clienteService.findAll();
  }

  @Get('clientes/:id')
  @ApiOperation({ summary: 'Obtener un cliente por su ID' })
  @ApiResponse({ status: 200, description: 'Detalles del cliente.'})
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.'})
  findOneCliente(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @Put('clientes/:id')
  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiResponse({ status: 200, description: 'El cliente ha sido actualizado.'})
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.'})
  updateCliente(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete('clientes/:id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiResponse({ status: 200, description: 'El cliente ha sido eliminado.'})
  @ApiResponse({ status: 404, description: 'Cliente no encontrado.'})
  removeCliente(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }

  // =================================================================================================
  // Endpoints para Conversaciones (estos ya existían)
  // =================================================================================================

  @Post('conversaciones')
  @ApiOperation({ summary: 'Crear una nueva conversación' })
  @ApiResponse({ status: 201, description: 'Conversación creada exitosamente.' })
  createConversacion(@Body() createConversacionDto: CreateConversacionDto) {
    return this.crmService.createConversacion(createConversacionDto);
  }

  @Get('conversaciones')
  @ApiOperation({ summary: 'Obtener todas las conversaciones' })
  findAllConversaciones() {
    return this.crmService.findAllConversaciones();
  }

  @Get('conversaciones/:id')
  @ApiOperation({ summary: 'Obtener una conversación por ID con sus mensajes' })
  @ApiResponse({ status: 200, description: 'Conversación encontrada.' })
  @ApiResponse({ status: 404, description: 'Conversación no encontrada.' })
  findConversacion(@Param('id', ParseUUIDPipe) id: string) {
    return this.crmService.findConversacionById(id);
  }

  @Post('conversaciones/:id/mensajes')
  @ApiOperation({ summary: 'Añadir un mensaje a una conversación existente' })
  @ApiResponse({ status: 201, description: 'Mensaje añadido exitosamente.' })
  addMensaje(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createMensajeDto: CreateMensajeDto,
  ) {
    return this.crmService.addMensajeToConversacion(id, createMensajeDto);
  }
} 