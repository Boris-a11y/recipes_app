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

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.recipe)
  user: User;
}
