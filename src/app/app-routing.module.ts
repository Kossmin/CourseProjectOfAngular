import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-book/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe-book/recipe.component";
import { Recipe } from "./recipe-book/recipe.model";
import { RecipeResolverService } from "./recipe-book/recipe.service.resolver";
import { ShoppingListComponent } from "./shopping/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', component: ShoppingListComponent},
    {path: 'recipebook', component: RecipeComponent, children: [
        {path: '', component: RecipeStartComponent},        
        {path: 'new', component: RecipeEditComponent},
        {path: ':index', component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        {path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolverService]},
    ]},
    {path: 'shoppinglist', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
    {path: '**', component: ErrorPageComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
  