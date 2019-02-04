import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";


@Injectable({
    providedIn: "root"
})
export  class CategoryInsertServive {

    private _categoryListComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoyListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    showModalInsert(){
        this._categoryListComponent.categoryNewModal.showModal();
    }

    onInsertSuccess($event: any){
        this.notifyMessage.success('Categoria cadastrado com sucesso!');
        console.log($event);
        this._categoryListComponent.getCategory();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
    }
}