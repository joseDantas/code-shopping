import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  categoryId: number;


  constructor(private http:HttpClient, public categoryHttp:CategoryHttpService) {
    //this.a = '';
  }

  ngOnInit() {
    console.log('ngOnInit');
      this.getCategory();
  }

  getCategory(){
      this.categoryHttp.list()
        .subscribe(response => {
            this.categories = response.data
        });
  }

  showModalInsert(){
      this.categoryNewModal.showModal()
  }

    showModalEdit(categoryId: number){
      this.categoryId = categoryId;
        this.categoryEditModal.showModal()
    }

    showModalDelete(categoryId: number){
        this.categoryId = categoryId;
        this.categoryDeleteModal.showModal()
    }

    onInsertSuccess($event: any){
      console.log($event);
      this.getCategory();
}

    onInsertError($event: HttpErrorResponse){
      console.log($event);
    }

    onEditSuccess($event: any){
        console.log($event);
        this.getCategory();
    }

    onEditError($event: HttpErrorResponse){
        console.log($event);
    }

    onDeleteSuccess($event: any){
        console.log($event);
        this.getCategory();
    }

    onDeleteError($event: HttpErrorResponse){
        console.log($event);
    }


}
//<{data: Array<any>}> vai ser recebido um objeto, dentro desse objeto vai ter um propriedade do tipo DATA e este, será um ARRAY que pode receber qualquer tipo de elemento