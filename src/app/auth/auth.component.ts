import { ThisReceiver } from "@angular/compiler";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent{
    isSignIn: boolean = true;
    isLoading: boolean = false;
    error;

    constructor(private authService: AuthService){}

    onSwitchMode(){
        this.isSignIn = !this.isSignIn;
    }

    onSubmit(form: NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value['email'];
        const password = form.value['password'];
        let authObs;
        this.isLoading = true;
        if(this.isSignIn){
            authObs = this.authService.login(email, password)
        }else{
            authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(resData => {
                console.log(resData);
                this.isLoading  = false;
            }, err => {
                this.error = err;
                this.isLoading = false;
            }
        );
        form.reset();
    }
}