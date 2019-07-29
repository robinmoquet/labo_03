import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';
import {TodosService} from './todos/todos.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [TodosModule, TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'labo_03',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
    })],
    controllers: [AppController/*, TodosController*/],
    providers: [AppService/*, TodosService*/],
})
export class AppModule {}
