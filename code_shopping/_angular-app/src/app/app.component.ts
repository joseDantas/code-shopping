import { Component } from '@angular/core';

import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';

  constructor(public authService: AuthService){

  }

  canShowNavabar(){
    return this.authService.isAuth();
  }
}
