import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService
  ) {}

  recipeForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required, Validators.min(5)]],
    description: ['', Validators.required],
    ingredients: [],
  });

  addRecipe() {
    const { title, description, ingredients } = this.recipeForm.value;
    this.recipesService.addRecipe(title, description, ingredients).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {}
}
