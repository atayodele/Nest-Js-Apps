import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Task } from "src/models/task.entity";


@Injectable()
export class DatabaseOptions implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      entities: [User, Task],
    };
  }
}