import {Injectable} from '@nestjs/common';
import {Todo} from './todo.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly repository: Repository<Todo>,
    ) {}

    async findAll(): Promise<Todo[]> {
        return await this.repository.find();
    }

    async findOne(id: number): Promise<Todo> {
        return await this.repository.findOne(id);
    }

    async create(todo: Todo): Promise<Todo> {
        return await this.repository.save(todo);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }
}
