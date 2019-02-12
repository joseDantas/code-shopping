import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    product = {
        name:'',
        description:'',
        price:1,
        active: true
    };


    _productId: number;


    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService) { }

    ngOnInit() {
    }

    @Input()
    set productId(value){
        this._productId = value;
        if(this._productId){
            this.productHttp
                .get(this._productId)
                .subscribe(product =>this.product = product)
        }
    }

    submit(){
        this.productHttp
            .update(this._productId, this.product)
            .subscribe((product) => {
                this.onSuccess.emit(product);
                this.modal.hide();
                //this.getProduct();
            }, error=> this.onError.emit(error));
    }

    showModal(){
        this.modal.show()

    }

    hideModel($event: Event){
        console.log($event);
    }

}
