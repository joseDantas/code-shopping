import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductInputListComponent} from "./product-input-list.component";



@Injectable({
    providedIn: "root"
})
export  class ProductInputInsertService {

    private _productInputInsertComponent: ProductInputListComponent;
    constructor(private notifyMessage: NotifyMessageService){
    }

    set inputListComponent(value: ProductInputListComponent){
        this._productInputInsertComponent = value;
    }

    showModalInsert(){
        this._productInputInsertComponent.inputNewModal.showModal()
    }

    onInsertSuccess($event: any){
        this.notifyMessage.success('Produto foi inserido com sucesso!');
        console.log($event);
        this._productInputInsertComponent.getInputs();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
    }
}