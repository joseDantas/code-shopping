import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs/operators";
import {Product, ProductPhoto} from "../../model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProductPhotoHttpService {

    private baseApi = `${environment.api.url}`;

    constructor(private http: HttpClient) { }

    list(productId: number): Observable <{product: Product, photos: ProductPhoto[] }> {
        return this.http
            .get<{data: any}>(this.getBaseUrl(productId))
            .pipe (
                map(response => response.data)
                );
    }
    private getBaseUrl(productId: number, photoId: number = null): string {
        let baseUrl = `${this.baseApi}/products/${productId}/photos`;
        if (photoId) {
            baseUrl += `${photoId}`;
        }
        return baseUrl;
    }

}
