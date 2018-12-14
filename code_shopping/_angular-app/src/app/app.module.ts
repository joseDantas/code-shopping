import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CategoryListComponent } from './components/pages/category/category-list/category-list.component';
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';



const routes: Routes = [    //mapeamento de rotas
     {
        path: 'login', component: LoginComponent
     },
    {
        path: 'categories/list', component: CategoryListComponent
    },
    {       //quando a página estiver totalmente vazia, redireciona para a página de login
        path: '',
        redirectTo: '\login',
        pathMatch: 'full'
    }
    ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
