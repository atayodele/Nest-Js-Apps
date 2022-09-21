import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at', default: new Date() })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', default: new Date() })
  updatedAt?: Date;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}