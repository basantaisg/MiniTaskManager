import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  createTask(title: string, description: string, user: User) {
    const task = this.taskRepo.create({ title, description, user });
    return this.taskRepo.save(task);
  }

  async getTasks(user: User, page = 1, limit = 10, status?: TaskStatus) {
    const skip = (page - 1) * limit;

    const query = this.taskRepo
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: user.id })
      .take(limit)
      .skip(skip);

    if (status) query.andWhere('task.status= :status', { status });

    return query.getMany();
  }

  async updateTask(id: number, data: Partial<Task>, user: User) {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) throw new Error('Task not found!');
    Object.assign(task, data);
    return this.taskRepo.save(task);
  }

  async deleteTask(id: number, user: User) {
    const task = await this.taskRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!task) throw new Error('task not found!');
    return this.taskRepo.remove(task);
  }
}
