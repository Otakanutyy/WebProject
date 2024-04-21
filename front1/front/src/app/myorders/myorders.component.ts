import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { OrderService } from '../services/order.service';
import { Order, Product } from '../models';
import { NgFor } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-myorders',
    standalone: true,
    templateUrl: './myorders.component.html',
    styleUrl: './myorders.component.css',
    imports: [NavbarComponent, NgFor]
})
export class MyordersComponent implements OnInit{
  orders: Order[]=[];
  products: Product[]=[];

  constructor(private orderService: OrderService,
              private productService: ProductService
  ){}

  ngOnInit(): void {
      this.getMyOrders();
  }

  getMyOrders(){
    this.orderService.getOrders().subscribe(data=>{
      this.orders = data;
      this.getProducts();
      
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(data=>{
      
    })
  }
}
