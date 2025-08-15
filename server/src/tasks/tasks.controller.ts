import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { TasksService } from './tasks.service';
import type { Request } from 'express';
import { TaskStatus } from './entities/task.entity';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() body: any, @Req() req: Request) {
    return this.tasksService.createTask(body.title, body.description, req.user);
  }

  @Get()
  get(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status?: string,
  ) {
    const statusEnum: TaskStatus | undefined =
      status && Object.values(TaskStatus).includes(status as TaskStatus)
        ? (status as TaskStatus)
        : undefined;

    return this.tasksService.getTasks(req.user, page, limit, statusEnum);
  }

  @Patch(':id')
  update(@Body() body: any, @Req() req: Request) {
    return this.tasksService.updateTask(body.id, body, req.user);
  }

  @Delete(':id')
  delete(@Body() body: any, @Req() req: Request) {
    return this.tasksService.deleteTask(body.id, req.user);
  }
}
