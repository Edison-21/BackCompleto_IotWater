import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../entities';
import { CreateRolDto, UpdateRolDto } from '../dtos';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const nuevoRol = this.rolRepository.create(createRolDto);
    return this.rolRepository.save(nuevoRol);
  }

  async findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({ where: { idRol: id } });
    if (!rol) {
      throw new NotFoundException(`Rol con ID #${id} no encontrado.`);
    }
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rol = await this.rolRepository.preload({
      idRol: id,
      ...updateRolDto,
    });
    if (!rol) {
      throw new NotFoundException(`Rol con ID #${id} no encontrado.`);
    }
    return this.rolRepository.save(rol);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.rolRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Rol con ID #${id} no encontrado.`);
    }
  }
} 