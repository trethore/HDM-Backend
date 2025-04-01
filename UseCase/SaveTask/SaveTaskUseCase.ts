import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [dto: SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}


  async handle(dto: SaveTaskDto) {
    /*
    * @todo IMPLEMENT HERE : VALIDATION DTO, DATA SAVING, ERROR CATCHING
     */
    
    // A Task without a name is useless
    if (!dto.name || dto.name.trim() === '') {
      throw new Error('Task name is required for creation');
    }
    // creation date or update date
    const now = new Date();

    if (dto.id !== undefined) {
      const existing = await this.taskRepository.findById(dto.id);
      if (!existing) {
        // error handling -> if the id doesnt exist throw an exception
        throw new NotFoundException(`Task with id ${dto.id} does not exist`);
      }
  
      return this.taskRepository.save({
        id: dto.id,
        name: dto.name,
        updatedAt: now,
      });
    }
  
    return this.taskRepository.save({
      name: dto.name,
      createdAt: now,
      updatedAt: now,
    });
  }
}
