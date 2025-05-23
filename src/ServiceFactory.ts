import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { UseCase } from './index';

@Injectable()
export default abstract class ServiceFactory<U extends UseCase<any, any>> {
  constructor(protected readonly container: ModuleRef) {}

  async create<T extends U>(type: Type<T>): Promise<T> {
    return this.container.create(type);
  }
}
