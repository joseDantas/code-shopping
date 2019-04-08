import {Injectable, ɵcontainerRefreshStart} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "../model";
import {JwtHelperService} from '@auth0/angular-jwt';
const TOKEN_KEY = 'code_shopping_token';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  me: User = null
  constructor(private http: HttpClient) {
    const token = this.getToken();
      this.setUserFromToken(token);
  }

  login(user: {email: string, password: string}): Observable<{token: string}>{
    return this.http
        .post<{token: string}>(`${environment.api.url}/login`, user)
        .pipe(
            tap(response=>{
              this.setToken(response.token)
            })

      );
  }

    setToken(token: string){
        this.setUserFromToken(token)
        token ? window.localStorage.setItem(TOKEN_KEY, token): window.localStorage.removeItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string){
        const decodedToken = new JwtHelperService().decodeToken(token);
        this.me = decodedToken ?{
          id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email,
        }: null;
    }

    getToken(): string | null{
        return window.localStorage.getItem(TOKEN_KEY);
    }

    isAuth(): boolean{
      const token = this.getToken();
      return !new JwtHelperService().isTokenExpired(token,30);
    }

    //quando for utiliazado o logout, os dados vai ficar nulo utilizando "window.localStorage.removeItem(TOKEN_KEY)" assim removendo o token existente
    logout(): Observable<any>{
        return this.http
            .post<{token: string}>(`${environment.api.url}/logout`, {})
            .pipe(
                tap(response=>{
                    this.setToken(null)
                })

            );
    }
}