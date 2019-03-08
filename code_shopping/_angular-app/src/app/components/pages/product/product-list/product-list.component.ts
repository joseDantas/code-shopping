import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../../model";
import {ProductNewModalComponent} from "../product-new-modal/product-new-modal.component";
import {ProductEditModalComponent} from "../product-edit-modal/product-edit-modal.component";
import {ProductDeleteModalComponent} from "../product-delete-modal/product-delete-modal.component";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {ProductDeleteService} from "./product-delete.service";
import {ProductEditService} from "./product-edit.service";
import {ProductInsertService} from "./product-insert.service";


@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    products: Array<Product> = [];
    pagination = {
        page: 1,
        totalItems: 0,
        itemsPerPage: 10
    }

    sortColumn = {column: 'created_at', sort: 'desc'};

    @ViewChild(ProductNewModalComponent)
    productNewModal: ProductNewModalComponent;

    @ViewChild(ProductEditModalComponent)
    productEditModal: ProductEditModalComponent;

    @ViewChild(ProductDeleteModalComponent)
    productDeleteModal: ProductDeleteModalComponent;

    productId: number;
    searchText: string;


    constructor(private productHttp:ProductHttpService,
                protected productInsertService: ProductInsertService,
                protected productEditService: ProductEditService,
                protected productDeleteService: ProductDeleteService) {
        this.productInsertService.productListComponent = this;
        this.productEditService.productListComponent = this;
        this.productDeleteService.productListComponent = this;
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.getProducts();
    }

    getProducts(){
        //this.productHttp.get(1).subscribe(product)
        this.productHttp.list({
            page: this.pagination.page,
            sort: this.sortColumn.column === ''? null: this.sortColumn,
            search: this.searchText})
            .subscribe(response => {
                this.products = response.data
                this.pagination.totalItems = response.meta.total;
                this.pagination.itemsPerPage = response.meta.per_page;
            });
    }

    pageChanged(page){
        this.pagination.page = page;
        this.getProducts()
    }

    sort(sortColumn){
        this.getProducts();
    }

    search(search){
        this.searchText = search;
        this.getProducts()
    }
}
