import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ProductOutputListComponent} from "./product-output-list.component";

@Injectable({
    providedIn: "root"
})
export  class ProductOutputInsertService {

    private _productOutputInsertComponent: ProductOutputListComponent;
    constructor(private notifyMessage: NotifyMessageService){
    }

    set outputListComponent(value: ProductOutputListComponent){
        this._productOutputInsertComponent = value;
    }

    showModalInsert(){
        this._productOutputInsertComponent.outputNewModal.showModal();
    }

    onInsertSuccess($event: any){
        this.notifyMessage.success('Produto foi inserido com sucesso!');
        console.log($event);
        this._productOutputInsertComponent.getOutputs();
    }

    onInsertError($event: HttpErrorResponse){
        console.log($event);
    }
}