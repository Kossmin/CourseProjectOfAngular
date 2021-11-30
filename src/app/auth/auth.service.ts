import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

interface ResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean;
}

@Injectable()
export class AuthService{

    user = new Subject<User>();

    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        return this.http.post<ResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7GHmZuCIZnvbMGogL2W_-C3cBldjJ56A',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                    catchError(this.handlingError),
                    tap(
                        (resData)=>{
                            this.handlingAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                        }
                    )
                );
    }

    login(email: string, password: string){
        return this.http.post<ResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7GHmZuCIZnvbMGogL2W_-C3cBldjJ56A',
            {email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handlingError));
    }

    handlingAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

    handlingError(error: HttpErrorResponse){
        let errorMessage = 'An unknown error';
                if(!error.error || !error.error.error){
                    return throwError(errorMessage);
                }

                switch(error.error.error.message){
                    case 'EMAIL_EXISTS':{
                        errorMessage = 'This email has been taken. Please try another email!';
                        break;
                    }
                    case 'EMAIL_NOT_FOUND':{
                        errorMessage = 'There is no user record corresponding to this identifier.';
                        break;
                    }
                    case 'INVALID_PASSWORD': {
                        errorMessage = 'The password is invalid.';
                        break;
                    }
                    case 'USER_DISABLED': {
                        errorMessage = 'The user account has been disabled by an administrator.';
                        break;
                    }
                }
                return throwError(errorMessage);
    }
}