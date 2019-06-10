import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchParamBuilder, SearchParams} from "./http-resource";
import {Observable} from "rxjs";
import {ProductOutput} from "../../model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductOutputHttpService {

    private baseUrl = `${environment.api.url}/outputs`;

    constructor(private http: HttpClient) { }

    list(searchParams: SearchParams): Observable <{data: Array<ProductOutput>, meta: any}> {
        const sParams = new SearchParamBuilder(searchParams).makeObject();
        const params = new HttpParams({
            fromObject: (<any>sParams)
        });
        return this.http
            .get<{data: Array<ProductOutput>, meta: any}>
            (this.baseUrl, {params});
    }

    get(id: number): Observable<ProductOutput> {
        return this.http
            .get<{data: ProductOutput}>(`${this.baseUrl}/${id}`)
            .pipe(
                map(response => response.data)
            )
    }

    create(data: {amount: number, product_id: number}): Observable<ProductOutput>{
        const token = window.localStorage.getItem('token');
        return this.http
            .post<{data: ProductOutput}>(this.baseUrl, data)
            .pipe(
                map(response => response.data)
            );
    }
}
