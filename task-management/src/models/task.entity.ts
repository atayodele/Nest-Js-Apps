import { Exclude } from 'class-transformer';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}