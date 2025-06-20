import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { CreateClienteDto, UpdateClienteDto } from '../dtos/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(nuevoCliente);
  }

  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteRepository.find();
    clientes.forEach(cliente => cliente.descifrarDatosPersonales());
    return clientes;
  }

  async findOne(idCliente: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { idCliente } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID "${idCliente}" no encontrado.`);
    }
    cliente.descifrarDatosPersonales();
    return cliente;
  }

  async update(idCliente: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.clienteRepository.preload({
      idCliente,
      ...updateClienteDto,
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID "${idCliente}" no encontrado.`);
    }
    return this.clienteRepository.save(cliente);
  }

  async remove(idCliente: string): Promise<void> {
    const result = await this.clienteRepository.delete(idCliente);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID "${idCliente}" no encontrado.`);
    }
  }
} 