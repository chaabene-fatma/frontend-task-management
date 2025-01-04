import {TaskStatus} from './task-status.enum';

export interface Task{
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  userId: number;
}
