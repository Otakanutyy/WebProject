import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, ActivatedRoute, Route } from '@angular/router';

import { Product } from '../models';
import { ProductPictureService } from '../services/productpicture.service';
import { ProductPicture } from '../models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NavbarComponent, NgIf, RouterModule, NgFor],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})


export class ProductDetailComponent implements OnInit{
  product : Product | undefined;
  picture1 : ProductPicture | undefined;
  pictures: any[]| undefined; 
  currentImgIndex: number = 0;

  constructor(private route:ActivatedRoute, private productservice: ProductService,
              private picture: ProductPictureService,
   ){

  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productservice.getProduct(productId).subscribe(product => {
      this.product = product;
    });
    this.getPictures();
  }

  getPictures(): void{
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.picture.getProductPicture(productId).subscribe(data=>{
      this.picture1 = data;
      if(this.picture1){
        this.pictures = [this.picture1.front_view, this.picture1.back_view, this.picture1.side_view];
      }
    });

    
  }

  nextImage() {
    if (this.pictures && this.pictures.length > 0) {
      this.currentImgIndex = (this.currentImgIndex + 1) % this.pictures.length;
    }
  }
  
  prevImage() {
    if (this.pictures && this.pictures.length > 0) {
      this.currentImgIndex = (this.currentImgIndex - 1 + this.pictures.length) % this.pictures.length;
    }
  }
  
}
