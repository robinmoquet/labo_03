import {DeleteResult, EntityRepository, Repository, UpdateResult} from 'typeorm';
import {Todo} from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {

    async findAll(): Promise<Todo[]> {
        return await this.find();
    }

    async findById(id: number): Promise<Todo> {
        return await this.findOne(id);
    }

    async updateOne(id: number, todo: Todo): Promise<UpdateResult> {
        return await this.update(id, todo);
    }

    async createTodo(todo: Todo): Promise<Todo> {
        return await this.save(todo);
    }

    async deleteTodo(id: number): Promise<DeleteResult> {
        return await this.delete(id);
    }
}
