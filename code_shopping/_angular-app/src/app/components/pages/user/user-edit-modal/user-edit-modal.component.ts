import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

    _userId: number;
    form: FormGroup;


    @ViewChild(ModalComponent) modal: ModalComponent;
    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private userHttp: UserHttpService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: '',
            email:'',
            password: ''
        });
    }

    ngOnInit() {
    }

    @Input()
    set userId(value){
        this._userId = value;
        if(this._userId){
            this.userHttp
                .get(this._userId)
                .subscribe(user =>this.form.patchValue(user),
                    responseError =>{
                        if(responseError.status == 401){
                            this.modal.hide();
                        }
                    }
                    )
        }
    }

    submit(){
        this.userHttp
            .update(this._userId, this.form.value)
            .subscribe((user) => {
                this.onSuccess.emit(user);
                this.modal.hide();
            }, error=> this.onError.emit(error));
    }

    showModal(){
        this.modal.show()

    }

    hideModel($event: Event){
        console.log($event);
    }

}
