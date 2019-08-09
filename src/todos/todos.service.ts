import { Injectable } from '@nestjs/common';
import { Todo } from './models/todo.entity';
import { User } from '../user/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async findAll(user: {userId: number, email: string}): Promise<Todo[]> {
    let currentUser = await this.userService.findOneByEmail(user.email, {relations: ['todos']});
    console.log('1');
    console.log(user);
    console.log('2');
    console.log(currentUser);
    return currentUser.todos;
  }

  async findOne(id: number, userId: number): Promise<Todo> {
    const user = await this.userService.findById(userId);
    return await this.repository.findOne({id, user: user});
  }

  async updateOne(id: number, todo: Todo, userId: number): Promise<UpdateResult> {
    return await this.repository.update(id, todo);
  }

  async create(todo: Todo, user: {userId: number, email: string}): Promise<Todo> {
    todo.status = 'todo';
    todo.user = await this.userService.findOneByEmail(user.email);
    return await this.repository.save(todo);
  }

  async delete(id: number, userId: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
