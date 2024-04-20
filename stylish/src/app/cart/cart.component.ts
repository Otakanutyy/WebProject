import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

import { Order } from '../models';
import { OrderService } from '../services/order.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  logged: boolean = false;
  orders: Order[] | undefined;
  products: number[]=[];

  constructor(private orderService: OrderService){

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
      this.products = this.orderService.getProducts();
    }
  }
  buy() {
    this.orderService.addOrder();
  }
}
