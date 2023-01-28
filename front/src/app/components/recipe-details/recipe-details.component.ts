import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  @Input() currentRecipe: Recipe = {
    title: '',
    description: '',
    ingredients: [],
    owner: '',
  };

  message = '';
  errorMessage = '';

  ngOnInit(): void {
    this.message = '';
    this.getRecipe(this.route.snapshot.paramMap.get('id'));
  }

  getRecipe(id: any): void {
    this.recipesService.getRecipe(id).subscribe({
      next: (data) => {
        this.currentRecipe = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // updatePublished(status): void {
  //   const data = {
  //     title: this.currentTutorial.title,
  //     description: this.currentTutorial.description,
  //     published: status,
  //   };

  //   this.tutorialService.update(this.currentTutorial.id, data).subscribe(
  //     (response) => {
  //       this.currentTutorial.published = status;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  deleteRecipe(): void {
    this.recipesService.deleteRecipe(this.currentRecipe.id).subscribe({
      next: (response) => {
        console.log(response);
        this.errorMessage = response.message;
      },
    });
  }
}
