import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients = this.shoppingService.getIngredients();

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.shoppingService.ingredientChanged.subscribe((ingredient) => this.ingredients = ingredient);
  }

  onEditItem(index: number): void {
    this.shoppingService.selectedIngredient.next(index);
  }

}
