import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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

}
