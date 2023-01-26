import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions } from '../utils/httpOptions';

const apiUrl = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get(`${apiUrl}/recipes`, httpOptions);
  }

  addRecipe(
    title: string,
    description: string,
    ingredients: string[]
  ): Observable<any> {
    return this.http.post(
      `${apiUrl}/recipes`,
      { title, description, ingredients },
      httpOptions
    );
  }

  deleteRecipe(id: any): Observable<any> {
    return this.http.delete(`${apiUrl}/recipes/${id}`, httpOptions);
  }
}
