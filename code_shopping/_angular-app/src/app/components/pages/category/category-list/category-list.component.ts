import { Component, OnInit, ViewChild } from '@angular/core';
import {CategoryNewModalComponent} from "../category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "../category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "../category-delete-modal/category-delete-modal.component";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {Category} from "../../../../model";
import {CategoryInsertServive} from "./category-insert.servive";
import {CategoryEditServive} from "./category-edit.servive";
import {CategoryDeleteServive} from "./category-delete.servive";



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<Category> = [];
  pagination = {
      page: 1,
      totalItems: 0,
      itemsPerPage: 15
  }
  sortColumn = {column: 'created_at', sort: 'desc'};

  @ViewChild(CategoryNewModalComponent)
  categoryNewModal: CategoryNewModalComponent;

  @ViewChild(CategoryEditModalComponent)
  categoryEditModal: CategoryEditModalComponent;

  @ViewChild(CategoryDeleteModalComponent)
  categoryDeleteModal: CategoryDeleteModalComponent;

  categoryId: number;
  searchText: string;


  constructor(private categoryHttp:CategoryHttpService,
              protected categoryInsertService: CategoryInsertServive,
              protected categoryEditService: CategoryEditServive,
              protected categoryDeleteService: CategoryDeleteServive) {
    this.categoryInsertService.categoyListComponent = this;
    this.categoryEditService.categoyListComponent = this;
    this.categoryDeleteService.categoyListComponent = this;
  }

  ngOnInit() {
    console.log('ngOnInit');
      this.getCategory();
  }

  getCategory(){
      //this.categoryHttp.get(1).subscribe(category)
      this.categoryHttp.list({
          page: this.pagination.page,
          sort: this.sortColumn.column === ''? null: this.sortColumn,
          search: this.searchText})
        .subscribe(response => {
            this.categories = response.data
            this.pagination.totalItems = response.meta.total;
            this.pagination.itemsPerPage = response.meta.per_page;
        });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getCategory()
  }

  sort(sortColumn){
    this.getCategory();
  }

  search(search){
    this.searchText = search;
    this.getCategory()
  }


}
//<{data: Array<any>}> vai ser recebido um objeto, dentro desse objeto vai ter um propriedade do tipo DATA e este, será um ARRAY que pode receber qualquer tipo de elemento