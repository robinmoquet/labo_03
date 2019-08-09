import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './models/todo.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), UserModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
