import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Task } from "../models/task.entity";
import { User } from "../models/user.entity";

@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      entities: [User, Task],
    };
  }
}