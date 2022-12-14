import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { CreateTaskDto, GetTasksFilterDto } from 'src/dto/task.dto';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Task } from 'src/models/task.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(Task)
export class TasksRepository extends Repository<Task> {
//   private logger = new Logger('TasksRepository', true);
  private logger = new Logger('TasksRepository');

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}