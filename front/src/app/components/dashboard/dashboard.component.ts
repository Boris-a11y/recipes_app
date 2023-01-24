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

  getOwnerId() {
    this.recipesService.getRecipes().subscribe({
      next: (data) => {
        console.log(data);
        this.recipes = data;
        console.log(data.owner);
      },
    });
  }

  deleteRecipes() {
    this.recipesService.deleteRecipe().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  ngOnInit(): void {
    this.getOwnerId();
  }
}
