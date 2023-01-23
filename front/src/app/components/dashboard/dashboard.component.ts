import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private authService: AuthService
  ) {}
  recipes: Recipe[] = [];
  currentUserId!: User;

  getUserId() {
    this.authService.me().subscribe({
      next: (data) => {
        console.log(data.currentUser.id);
        this.currentUserId = data.currentUser.id;
      },
    });
  }

  ngOnInit(): void {
    this.getUserId();
    this.recipesService.getRecipes().subscribe({
      next: (data) => {
        console.log(data);
        this.recipes = data;
      },
    });
  }
}
