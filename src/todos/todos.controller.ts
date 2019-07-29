import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {TodosService} from './todos.service';
import {Todo} from './todo.entity';
import {DeleteResult} from 'typeorm';

@Controller('todos')
export class TodosController {

    constructor(
        private readonly todoService: TodosService,
    ) {}

    @Get()
    todos(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    todo(@Param('id') id: number): Promise<Todo> {
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body() todo: Todo): Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<DeleteResult> {
        return this.todoService.delete(id);
    }
}
