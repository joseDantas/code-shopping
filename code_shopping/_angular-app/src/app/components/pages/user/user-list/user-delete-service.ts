import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";



@Injectable({
    providedIn: "root"
})
export  class UserDeleteService {

    private _userDeleteComponent: UserListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userDeleteComponent = value;
    }

    showModalDelete(userId: number){
        this._userDeleteComponent.userId = userId;
        this._userDeleteComponent.userDeleteModal.showModal()
    }


    onDeleteSuccess($event: any){
        this.notifyMessage.success('Usuário foi excluifo com sucesso!');
        console.log($event);
        this._userDeleteComponent.getUser();
    }

    onDeleteError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possível excluir o usuário! ')
    }
}