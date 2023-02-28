import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Recipe } from '@entity/Recipe';

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

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipe: Recipe[];
}
