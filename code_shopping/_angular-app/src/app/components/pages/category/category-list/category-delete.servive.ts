import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {CategoryListComponent} from "./category-list.component";


@Injectable({
    providedIn: "root"
})
export  class CategoryDeleteServive {

    private _categoryDeleteComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set categoyListComponent(value: CategoryListComponent){
        this._categoryDeleteComponent = value;
    }

    showModalDelete(categoryId: number){
        this._categoryDeleteComponent.categoryId = categoryId;
        this._categoryDeleteComponent.categoryDeleteModal.showModal()
    }


    onDeleteSuccess($event: any){
        this.notifyMessage.success('Categoria foi excluifo com sucesso!');
        console.log($event);
        this._categoryDeleteComponent.getCategory();
    }

    onDeleteError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel excluir a categoria! ' +
            'Verifique se a mesma não está relacionado com o produto')
    }
}