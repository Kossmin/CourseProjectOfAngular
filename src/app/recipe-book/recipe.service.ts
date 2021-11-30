import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
 
@Injectable()
export class RecipeService{

    recipeSelected = new Subject<Recipe>();
    recipeListChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] ;
    subcription;
    // = [
    //     new Recipe('Cơm tấm',
    //     'Just a test recipe',
    //     'https://hoangviettravel.vn/wp-content/uploads/2020/09/quan-com-tam-ngon-quan-1-01-compressed.jpg',
    //     [
    //         new Ingredient('pork', 1),
    //         new Ingredient('rice', 1),
    //         new Ingredient('fish sauce', 1),
    //     ]
    //      ),
    //     new Recipe('Cá viên chiên', 
    //     'Just a test recipe', 
    //     'https://images.foody.vn/res/g93/922771/prof/s576x330/image-56953bc6-200910114142.jpeg',
    //     [
    //         new Ingredient('fish ball', 3)
    //     ]
    //     ),
    // ];

    constructor(private http: HttpClient){}

    fetchRecipes(){
       this.subcription = this.http.get<Recipe[]>('https://course-project-angular-demo-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
        }))    
        .subscribe(recipes =>{
            console.log(recipes);
            this.recipes = recipes;
            this.recipeListChanged.next(this.recipes);
        });
    }

    getRecipes(){
        return this.recipes;
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe): void {
        this.recipes.push(recipe);
        this.recipeListChanged.next(this.recipes.slice());
    }

    saveRecipe(recipes: Recipe[]): void {
        this.http.put('https://course-project-angular-demo-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', this.recipes)
        .subscribe((data)=>{
        });
    }

    updateRecipe(index: number, recipe: Recipe): void {
        this.recipes[index] = recipe;
        this.recipeListChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number): void {
        this.recipes.splice(index, 1);
        this.recipeListChanged.next(this.recipes.slice());
        this.saveRecipe(this.recipes);
    }
}