
import {Observable} from 'rxjs/internal/Observable'
import {Category} from "../../model";
import {map} from "rxjs/operators";
import {HttpClient, HttpParams} from "@angular/common/http";


export interface HttpResource<T> {

    list(page: number): Observable <{data: Array<T>, meta: any}>;

    get(id: number): Observable<T>;

    create(data: T): Observable<T>;

    update(id: number, data: T);

    destroy(id: number): Observable<any>;
}
