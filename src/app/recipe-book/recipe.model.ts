import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[] = [];

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]){
        this.description=description;
        this.name=name;
        this.imagePath=imagePath;
        this.ingredients = ingredients;
    }
}