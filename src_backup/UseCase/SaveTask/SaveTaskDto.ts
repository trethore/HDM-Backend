import { TaskPriority } from '@prisma/client';

export default class SaveTaskDto {
  id: null | number;
  name: string;
  priority?: TaskPriority;
}
