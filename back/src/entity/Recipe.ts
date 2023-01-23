import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column()
  description?: string;

  @Column('text', { array: true })
  ingredients: string[];

  @ManyToOne(() => User, (user) => user.recipe)
  user: User;
}
