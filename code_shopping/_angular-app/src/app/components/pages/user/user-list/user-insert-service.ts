import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {UserListComponent} from "./user-list.component";



@Injectable({
    providedIn: "root"
})
export  class UserInsertService {

    private _userInsertComponent: UserListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set userListComponent(value: UserListComponent){
        this._userInsertComponent = value;
    }

    showModalInsert(userId: number){
        this._userInsertComponent.userId = userId;
        this._userInsertComponent.userNewModal.showModal()
    }


    onInsertSuccess($event: any){
        this.notifyMessage.success('Usuário incluido com sucesso!');
        console.log($event);
        this._userInsertComponent.getUser();
    }

    onInsertError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel cadastrar o usuário! ')
    }
}