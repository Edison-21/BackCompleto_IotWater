import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversacionCRM, MensajeCRM } from '../entities';
import { CreateConversacionDto, CreateMensajeDto } from '../dtos/crm.dto';

@Injectable()
export class CrmService {
  constructor(
    @InjectRepository(ConversacionCRM)
    private readonly conversacionRepository: Repository<ConversacionCRM>,
    @InjectRepository(MensajeCRM)
    private readonly mensajeRepository: Repository<MensajeCRM>,
  ) {}

  async createConversacion(dto: CreateConversacionDto): Promise<ConversacionCRM> {
    const nuevaConversacion = this.conversacionRepository.create(dto);
    return this.conversacionRepository.save(nuevaConversacion);
  }

  async addMensajeToConversacion(idConversacion: string, dto: CreateMensajeDto): Promise<MensajeCRM> {
    const conversacion = await this.findConversacionById(idConversacion);
    const nuevoMensaje = this.mensajeRepository.create({
      ...dto,
      conversacion: conversacion,
    });
    return this.mensajeRepository.save(nuevoMensaje);
  }

  async findConversacionById(id: string): Promise<ConversacionCRM> {
    const conversacion = await this.conversacionRepository.findOne({ 
        where: { idConversacion: id },
        relations: ['mensajes', 'cliente', 'agenteAsignado'] 
    });
    if (!conversacion) {
      throw new NotFoundException(`Conversación con ID #${id} no encontrada.`);
    }
    return conversacion;
  }

  async findAllConversaciones(): Promise<ConversacionCRM[]> {
    return this.conversacionRepository.find({ relations: ['cliente', 'agenteAsignado'] });
  }
} 