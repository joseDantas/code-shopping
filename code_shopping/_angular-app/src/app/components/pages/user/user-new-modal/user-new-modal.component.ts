import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../../model";
import {UserHttpService} from "../../../../services/http/user-http.service";


@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

    user: User = {
        name:'',
        email:'',
        password:''
    };

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private userHttp: UserHttpService) { }

    ngOnInit() {
    }

    submit(){
        this.userHttp
            .create(this.user)
            .subscribe((user) => {
                this.onSuccess.emit(user);
                this.modal.hide();
                //this.getUser();
            }, error=> this.onError.emit(error));
    }

    showModal(){
        this.modal.show()

    }

    hideModel($event: Event){
        console.log($event);
    }

}
