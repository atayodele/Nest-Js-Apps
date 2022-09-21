import { Module } from '@nestjs/common';
import { TasksController } from 'src/controller/task/task.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { TasksRepository } from 'src/repository/tasks.repository';
import { TasksService } from 'src/services/task/task.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TasksRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}