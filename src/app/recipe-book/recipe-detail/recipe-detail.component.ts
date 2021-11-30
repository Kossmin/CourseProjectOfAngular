import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from 'src/app/shopping/shopping.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipeDetail:Recipe;
    index: number;

  constructor(private shoppingService: ShoppingService,
     private route: ActivatedRoute,
     private recipeService: RecipeService,
     private router: Router
     ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = params['index'];
      this.recipeDetail = this.recipeService.getRecipe(+this.index);
    });
    
  }

  AddToShoppingList(){
    this.shoppingService.addIngredients(this.recipeDetail.ingredients);
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(['/recipebook']);
  }
}
