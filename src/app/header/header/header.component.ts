import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/recipe-book/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  collapsed: boolean = true;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSaveRecipe(){
    this.recipeService.saveRecipe(this.recipeService.getRecipes())
  }

  onFetchRecipe(){
    this.recipeService.fetchRecipes();
  }

}
