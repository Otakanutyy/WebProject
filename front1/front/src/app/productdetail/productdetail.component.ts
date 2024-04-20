import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product, ProductPicture } from '../models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent implements OnInit{
  product : Product | undefined;
  picture1 : ProductPicture | undefined;
  pictures: any[]| undefined; 
  currentImgIndex: number = 0;

  constructor(private route:ActivatedRoute,
              private productService: ProductService,
   ){

  }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.getProduct(productId).subscribe(product => {
      this.product = product;
    });
    this.getPictures();
  }

  getPictures(): void{
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.getProductPicturesByProductId(productId).subscribe(data=>{
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
