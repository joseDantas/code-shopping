import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '',
      password: ''
  }

  showMessageError = false;  //erro quando o login estiver errado

  constructor(private authService: AuthService,private http: HttpClient, private router: Router) {   //injeção de dependencia automatica


  }

  ngOnInit() {
  }

  submit(){
      this.authService.login(this.credentials)
          .subscribe((data) =>{
              const token = data.token;
              window.localStorage.setItem('token',token);
              this.router.navigate(['categories/list']);


          },() => this.showMessageError = true); //erro quando o login estiver errado
      return false
  }

}

//comando <any> faz com que o JS aceite qualquer tipo de dados
