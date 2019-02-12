import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductListComponent} from "./product-list.component";



@Injectable({
    providedIn: "root"
})
export  class ProductInsertService {

    private _productInsertComponent: ProductListComponent

    constructor(private notifyMessage: NotifyMessageService){

    }

    set productListComponent(value: ProductListComponent){
        this._productInsertComponent = value;
    }

    showModalInsert(productId: number){
        this._productInsertComponent.productId = productId;
        this._productInsertComponent.productNewModal.showModal()
    }


    onInsertSuccess($event: any){
        this.notifyMessage.success('Produto foi inserido com sucesso!');
        console.log($event);
        this._productInsertComponent.getProducts();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
    }
}