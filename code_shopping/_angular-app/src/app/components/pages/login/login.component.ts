import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
<<<<<<< HEAD
import {subscribeOn} from "rxjs/operators";
=======
import {Router} from "@angular/router";

>>>>>>> angular
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
<<<<<<< HEAD
  constructor(private http: HttpClient) {   //injeção de dependencia automatica
=======
  constructor(private http: HttpClient, private router: Router) {   //injeção de dependencia automatica
>>>>>>> angular

  }

  ngOnInit() {
  }

  submit(){
      this.http.post<any>('http://localhost:8000/api/login', this.credentials)
          .subscribe((data) =>{
<<<<<<< HEAD
            const token = data.token;
            this.http.get('http://localhost:8000/api/categories', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
                .subscribe(data => console.log(data));
=======
              this.router.navigate(['categories/list']);
            const token = data.token;
            //this.http.get('http://localhost:8000/api/categories', {
             // headers: {
              //  'Authorization': `Bearer ${token}`
              //}
            //})
               // .subscribe(data => console.log(data));

>>>>>>> angular
          });
      return false
  }

}

//comando <any> faz com que o JS aceite qualquer tipo de dados
