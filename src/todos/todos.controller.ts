import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ResponseDto, Status } from '../response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async todos(@Request() req): Promise<ResponseDto<Todo[]>> {
    //console.log(req.user);
    return {
      status: Status.success,
      data: await this.todoService.findAll(req.user)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async todo(@Request() req, @Param('id') id: number): Promise<ResponseDto<Todo>> {
    const data = await this.todoService.findOne(id, req.user.userId);
    if(data === undefined) {
      return {
        status: Status.errors,
        data: null
      }
    }
    
    return {
      status: Status.success,
      data
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Request() req, @Body() todo: Todo, @Param('id') id: number): Promise<ResponseDto<UpdateResult>> {
    return {
      status: Status.success,
      data: await this.todoService.updateOne(id, todo, req.user.userId)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Request() req, @Body() todo: Todo): Promise<ResponseDto<Todo>> {
    return {
      status: Status.success,
      data: await this.todoService.create(todo, req.user)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: number): Promise<ResponseDto<DeleteResult>> {
    return {
      status: Status.success,
      data: await this.todoService.delete(id, req.user.userId)
    }
  }
}
