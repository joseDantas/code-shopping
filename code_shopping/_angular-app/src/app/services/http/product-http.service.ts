import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamBuilder} from "./http-resource";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService implements HttpResource<Product>{

    private baseUrl = `${environment.api.url}/products`;

    constructor(private http:HttpClient) { }

    list(searchParams: SearchParams): Observable <{data: Array<Product>, meta: any}>{
        const token = window.localStorage.getItem('token');
        const params = new HttpParams({
            fromObject: new SearchParamBuilder(searchParams).makeObject()
        });
        return this.http
            .get<{data: Array<Product>, meta: any}>
            (this.baseUrl, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    }

    get(id: number): Observable<Product>{
        const token = window.localStorage.getItem('token');
        return this.http
            .get<{data: Product}>
            (`${this.baseUrl}/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map(response => response.data)
            )
    }

    create(data: Product): Observable<Product>{
        const token = window.localStorage.getItem('token');
        return this.http
            .post<{data: Product}>(this.baseUrl, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map(response => response.data)
            );
    }

    update(id: number, data: Product): Observable<Product>{
        const token = window.localStorage.getItem('token');
        return this.http
            .put<{data: Product}>(`${this.baseUrl}/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .pipe(
                map(response => response.data)
            )

    }

    destroy(id: number): Observable<any>{
        const token = window.localStorage.getItem('token');
        return this.http
            .delete
            (`${this.baseUrl}/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    }
}
