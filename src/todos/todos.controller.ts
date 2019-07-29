import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TodosService} from './todos.service';
import {Todo} from './todo.entity';
import {DeleteResult, UpdateResult} from 'typeorm';

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

    @Put(':id')
    update(@Body() todo: Todo, @Param('id') id: number): Promise<UpdateResult> {
        return this.todoService.updateOne(id, todo);
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
