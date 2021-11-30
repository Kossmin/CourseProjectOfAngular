import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) shoppingListForm : NgForm; 
  subcription: Subscription;
  editMode = false;
  editedItemIndex :number;
  editedItem: Ingredient;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subcription = this.shoppingService.selectedIngredient
      .subscribe((index)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  onAddIngredient(form: NgForm){
    // this.shoppingService.ingredientSelected.emit(new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value));
    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex, new Ingredient(form.value.name, +form.value.amount));
    }else{
      this.shoppingService.addIngredient(new Ingredient(form.value.name, +form.value.amount));
    }
    this.editMode = false;
    this.onResetForm();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onResetForm();
  }

  onResetForm(){
    this.editMode = false;
    this.shoppingListForm.reset({
      name: '', 
      amount: '',
    })
  }

}
