import { Module } from '@nestjs/common';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [LessonModule],
})
export class AppModule {}
