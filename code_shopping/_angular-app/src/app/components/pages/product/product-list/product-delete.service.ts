import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";



@Injectable({
    providedIn: "root"
})
export  class ProductDeleteService {

    private _productDeleteComponent: ProductListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productDeleteComponent = value;
    }

    showModalDelete(productId: number){
        this._productDeleteComponent.productId = productId;
        this._productDeleteComponent.productDeleteModal.showModal()
    }


    onDeleteSuccess($event: any){
        this.notifyMessage.success('Categoria foi excluifo com sucesso!');
        console.log($event);
        this._productDeleteComponent.getProducts();
    }

    onDeleteError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel excluir a categoria! ' +
            'Verifique se a mesma não está relacionado com o produto')
    }
}