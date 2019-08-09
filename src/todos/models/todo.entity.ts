import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/models/user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  topic: string;

  @Column({ length: 50 })
  status: string;

  @Column('int')
  priority: number;

  @ManyToOne(type => User, user => user.todos)
  user: User;

}
