import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
