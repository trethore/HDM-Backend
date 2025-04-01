import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }
  
  async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if (!data.id) {
      // @todo IMPLEMENT HERE USING PRISMA API
      return await this.prisma.task.create({
        data: data as Prisma.TaskCreateInput, 
      });
    }

    // @todo IMPLEMENT HERE USING PRISMA API
    // To be sure than id is a number
    const id =
      typeof data.id === 'number'
        ? data.id
        : data.id.set;

    return await this.prisma.task.update({
      where: { id },
      data: data as Prisma.TaskUpdateInput,
    });
  }
}
