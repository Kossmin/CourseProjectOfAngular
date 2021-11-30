import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{

    selectedIngredient = new Subject<number>();
    ingredientChanged = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient("pork", 5),
        new Ingredient("rice", 5),
        new Ingredient("fish sauce", 5),
        new Ingredient("fish ball", 5),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number): Ingredient{
        return this.ingredients.slice()[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){ 
        for(let i = 0; i < ingredients.length; i++){
            let isAdded = false;
            for(let j = 0; j < this.ingredients.length; j++){
                if(ingredients[i].name.toLowerCase() == this.ingredients[j].name.toLowerCase()){
                    isAdded = true;
                    this.ingredients[j].amount = this.ingredients[j].amount + ingredients[i].amount;
                }
            }
            if(!isAdded){
                this.ingredients.push(ingredients[i]);
            }
        }
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}