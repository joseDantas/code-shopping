import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {subscribeOn} from "rxjs/operators";
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
  constructor(private http: HttpClient) {   //injeção de dependencia automatica

  }

  ngOnInit() {
  }

  submit(){
      this.http.post<any>('http://localhost:8000/api/login', this.credentials)
          .subscribe((data) =>{
            const token = data.token;
            this.http.get('http://localhost:8000/api/categories', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
                .subscribe(data => console.log(data));
          });
      return false
  }

}

//comando <any> faz com que o JS aceite qualquer tipo de dados
