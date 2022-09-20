import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Logger } from '@nestjs/common';
import { TasksService } from 'src/services/task/task.service';
import { CreateTaskDto, GetTasksFilterDto, UpdateTaskStatusDto } from 'src/dto/task.dto';
import { User } from 'src/models/user.entity';
import { Task } from 'src/models/task.entity';
import { GetUser } from 'src/utils/get-user.decorator';
  
  @Controller('tasks')
  @UseGuards(AuthGuard())
  export class TasksController {
    private logger = new Logger('TasksController');
  
    constructor(private tasksService: TasksService) {}
  
    @Get()
    getTasks(
      @Query() filterDto: GetTasksFilterDto,
      @GetUser() user: User,
    ): Promise<Task[]> {
      this.logger.verbose(
        `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.tasksService.getTasks(filterDto, user);
    }
  
    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
      return this.tasksService.getTaskById(id, user);
    }
  
    @Post()
    createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User,
    ): Promise<Task> {
      this.logger.verbose(
        `User "${user.username}" creating a new task. Data: ${JSON.stringify(
          createTaskDto,
        )}`,
      );
      return this.tasksService.createTask(createTaskDto, user);
    }
  
    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
      return this.tasksService.deleteTask(id, user);
    }
  
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id: string,
      @Body() updateTaskStatusDto: UpdateTaskStatusDto,
      @GetUser() user: User,
    ): Promise<Task> {
      const { status } = updateTaskStatusDto;
      return this.tasksService.updateTaskStatus(id, status, user);
    }
  }