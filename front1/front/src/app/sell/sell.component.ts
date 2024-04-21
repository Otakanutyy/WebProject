import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import { Product, ProductPicture } from '../models';
import { ProductService } from '../services/product.service';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {
  name: string = '';
  description: string = '';
  price:number=0;
  brand: string = '';
  category: number=0;
  prodPictures: ProductPicture|undefined;

  productId : number = 0;
  picture1: File | null = null;
  picture2: File | null = null;
  picture3: File | null = null;

  constructor(private productService: ProductService){}

  onImageCange(event: any) {
     this.picture1 = event.target.files[0];
     this.picture2 = event.target.files[1];
     this.picture3 = event.target.files[2];
  }

  onSubmit() {
    // Send product data and picture data separately
    this.productService.addProduct(this.name, this.description, this.price, this.brand, this.category).subscribe(data=>{
        this.productId= data.id;
    })
    if(this.picture1 && this.picture2 && this.picture3 ){
      this.productService.addProducPicture(this.productId, this.picture1, this.picture2, this.picture3).subscribe(data=>{
        this.prodPictures = data;
        console.log(this.prodPictures)
      })
    }
    
  }
}
