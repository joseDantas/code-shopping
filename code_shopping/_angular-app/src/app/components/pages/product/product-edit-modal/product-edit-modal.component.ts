import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

    _productId: number;
    form: FormGroup;

    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: '',
            description:'',
            price:0,
            active: true
        });
    }

    ngOnInit() {
    }

    @Input()
    set productId(value){
        this._productId = value;
        if(this._productId){
            this.productHttp
                .get(this._productId)
                .subscribe(product =>this.form.patchValue(product),
                    responseError =>{
                        if(responseError.status == 401){
                            this.modal.hide();
                        }
                    }
                    )
        }
    }

    submit(){
        this.productHttp
            .update(this._productId, this.form.value)
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
