import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password: string;

  @Column()
  age!: number;

  @Column()
  ownerId: number;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipe: Recipe[];
}