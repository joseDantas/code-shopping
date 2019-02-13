import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";



@Injectable({
    providedIn: "root"
})
export  class UserEditService {

    private _userEditComponent: UserListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userEditComponent = value;
    }

    showModalEdit(userId: number){
        this._userEditComponent.userId = userId;
        this._userEditComponent.userEditModal.showModal()
    }


    onEditSuccess($event: any){
        this.notifyMessage.success('Usuário editado com sucesso!');
        console.log($event);
        this._userEditComponent.getUser();
    }

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel editar o usuário! ')
    }
}