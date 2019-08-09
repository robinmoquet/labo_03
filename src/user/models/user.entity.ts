import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from '../../todos/models/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  firstname: string;

  @Column({ length: 150 })
  lastname: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  password: string;

  @OneToMany(type => Todo, todo => todo.user)
  todos: Todo[];
}
