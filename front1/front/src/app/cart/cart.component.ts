import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order, Product } from '../models';
import { ProductService } from '../services/product.service';
import { ProductPicture } from '../models';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [NgIf, NgFor, NavbarComponent]
})
export class CartComponent implements OnInit{
  logged: boolean = false;
  cart: number[] = [];
  products: Product[] = [];
  productsPictures: ProductPicture[] = [];
  order: Order|undefined;

  constructor(private orderService: OrderService,
              private productService: ProductService
  ){
  }

  ngOnInit(): void {
    const access:string|null = localStorage.getItem("access");
    if(access){
      this.logged = true;
    }
    else{
      this.logged = false;
    }

    if(this.logged){
      this.cart = this.orderService.getCart();
      this.getProducts();
    }
  }

  getProducts(){
    for(let id of this.cart){
      this.productService.getProduct(id).subscribe(data=>{
        this.products.push(data);
      });
      this.productService.getProductPicturesByProductId(id).subscribe(data=>{
        this.productsPictures.push(data);
      })
    }
  }

  buy(){
    this.orderService.addOrder().subscribe(data=>{
      this.order = data;
    })
    this.orderService.clearCart();
    this.cart = [];
  }
}
