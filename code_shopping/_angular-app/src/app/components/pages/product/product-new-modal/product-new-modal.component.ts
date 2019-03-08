import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductHttpService} from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import fieldsOptions from "../../product/product-form/product-fields-options";



@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

    form: FormGroup;
    errors = {};

    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private productHttp: ProductHttpService, private formBuilder:FormBuilder) {
        const maxLength = fieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
            name: [''],
            description: [''],
            price: [''],
            active: true
        });
    }

    ngOnInit() {
    }

    submit(){
        this.productHttp
            .create(this.form.value)
            .subscribe((product) => {
                this.form.reset({
                    name:'',
                    description: '',
                    price: '',
                    active: true
                });
                this.onSuccess.emit(product);
                this.modal.hide();
            }, responseError => {
                if (responseError.status === 422) {
                    this.errors = responseError.error.errors
                }
                this.onError.emit(responseError)
            });
    }

    showModal(){
        this.form.reset({
            name:'',
            description: '',
            price: '',
            active: true
        });
        this.modal.show()

    }

    showErrors(){
        return Object.keys(this.errors).length !=0;
    }

    hideModel($event: Event){
        this.form.reset({
            name:'',
            description: '',
            price: '',
            active: true
        });
        console.log($event);
    }

}
