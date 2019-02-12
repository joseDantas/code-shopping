import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";



@Injectable({
    providedIn: "root"
})
export  class ProductEditService {

    private _productEditComponent: ProductListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productEditComponent = value;
    }

    showModalEdit(productId: number){
        this._productEditComponent.productId = productId;
        this._productEditComponent.productEditModal.showModal()
    }


    onEditSuccess($event: any){
        this.notifyMessage.success('Produto foi editado com sucesso!');
        console.log($event);
        this._productEditComponent.getProducts();
    }

    onEditError($event: HttpErrorResponse){
        console.log($event);
    }
}