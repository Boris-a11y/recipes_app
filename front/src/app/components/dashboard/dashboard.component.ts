import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private recipesService: RecipesService) {}
  recipes: Recipe[] = [];
  ownerId!: User;

  getOwnerId() {
    this.recipesService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
      },
    });
  }

  ngOnInit(): void {
    this.getOwnerId();
  }
}
