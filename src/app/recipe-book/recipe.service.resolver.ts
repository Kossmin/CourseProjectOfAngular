import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "./recipe.model"
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        this.recipeService.fetchRecipes();
        console.log(this.recipeService.getRecipes());
        return this.recipeService.getRecipes();
    }

}