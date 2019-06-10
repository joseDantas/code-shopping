import { Component, OnInit } from '@angular/core';
import { ProductPhoto, Product } from 'src/app/model';
import { ProductPhotoHttpService } from 'src/app/services/http/product-photo-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-photo-menager',
  templateUrl: './product-photo-menager.component.html',
  styleUrls: ['./product-photo-menager.component.css']
})
export class ProductPhotoMenagerComponent implements OnInit {

  photos: ProductPhoto [] = [];
  product: Product = null;
  productId: number;

  constructor( private productPhotoHttp: ProductPhotoHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.productId = params.product;
      this.getPhotos();
    });
  }

  getPhotos() {
    this.productPhotoHttp
        .list(this.productId)
        .subscribe( data => {
          this.photos = data.photos;
          this.product = data.product;
        });
  }

}
