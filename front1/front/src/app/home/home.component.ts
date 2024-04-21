import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Product, ProductPicture } from '../models';
import { ProductService } from '../services/product.service';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavbarComponent, NgFor, NgIf, RouterModule, RouterOutlet]
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  productPicturesDict: { [key: number]: ProductPicture } = {};
  picturesforproduct: ProductPicture | undefined;

  constructor(private prodService: ProductService){}

  ngOnInit(): void {
      this.getTopProducts();
  }

  getTopProducts(){
    this.prodService.getTopRatedProducts().subscribe(data=>{
      this.products = data;
      this.loadpictures();
    })
  }
  

  loadpictures(){
    this.products.forEach(product => {
      this.prodService.getProductPicturesByProductId(product.id).subscribe(
        (data: ProductPicture) => {
          if (data && data.front_view) {
            this.productPicturesDict[product.id] = data;
          } else {
            console.error(`Product picture data for product ${product.id} is invalid.`);
          }
        },
        error => {
          console.error('Error fetching pictures for product:', error);
        }
      );
    });
  }
} 
