import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";


@Injectable({
    providedIn: "root"
})
export  class CategoryEditServive {

    private _categoryEditComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoyListComponent(value: CategoryListComponent){
        this._categoryEditComponent = value;
    }

    showModalEdit(categoryId: number){

        this._categoryEditComponent.categoryId = categoryId;
        this._categoryEditComponent.categoryEditModal.showModal()
    }

    onEditSuccess($event: any){
        this.notifyMessage.success('Nome foi editado com sucesso!');
        console.log($event);
        this._categoryEditComponent.getCategory();
    }

    onEditError($event: HttpErrorResponse){
        console.log($event);
    }
}