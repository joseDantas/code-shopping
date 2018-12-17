import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModalComponent} from "../../../bootstrap/modal/modal.component";

declare var $;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  category = {
      name:''
  };

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private http:HttpClient) {
    //this.a = '';
  }

  ngOnInit() {
    console.log('ngOnInit');
      this.getCategory();
  }

  submit(){
      const token = window.localStorage.getItem('token');
      this.http
          .post('http://localhost:8000/api/categories', this.category, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .subscribe((category) => {
              console.log(category);
              this.getCategory();
              $('#exampleModal').modal('hide')
          });
  }

  getCategory(){
      const token = window.localStorage.getItem('token');
      this.http.get<{data: Array<any>}>('http://localhost:8000/api/categories', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .subscribe(response => {
              response.data[0].active = false;
              this.categories = response.data
          });
  }

  showModal(){
      this.modal.show()
      setTimeout(()=>{
          this.modal.hide()
      }, 3000)
  }

  hideModel($event: Event){
      console.log($event);
  }

}
//<{data: Array<any>}> vai ser recebido um objeto, dentro desse objeto vai ter um propriedade do tipo DATA e este, será um ARRAY que pode receber qualquer tipo de elemento