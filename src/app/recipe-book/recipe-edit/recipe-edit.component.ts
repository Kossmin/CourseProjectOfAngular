import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean = false;
  recipeForm:FormGroup;
  

  constructor(private route: ActivatedRoute, 
    private recipeService: RecipeService, 
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.formInit();
    })
  }
  
  onSubmit(): void {
    const newRecipe = 
      new Recipe(this.recipeForm.value['name'],
        this.recipeForm.value['description'], 
        this.recipeForm.value['imgPath'],
        this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeService.saveRecipe(this.recipeService.getRecipes());
    }else{
      this.recipeService.addRecipe(newRecipe);
      this.recipeService.saveRecipe(this.recipeService.getRecipes());
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['/recipebook'], {relativeTo: this.route})
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  formInit(){
    let recipeName;
    let recipeImgPath;
    let recipeDescription;
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      
      if(recipe['ingredients']){
        for(let ingredient of recipe['ingredients']){
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, [Validators.required]),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+$')])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imgPath: new FormControl(recipeImgPath, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: recipeIngredients,
    })
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, [Validators.required]),
        amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+$')]),
      })
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
