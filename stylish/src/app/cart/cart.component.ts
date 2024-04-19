import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

import { Order } from '../models';
import { OrderService } from '../services/order.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  logged: boolean = false;
  order: Order | undefined;

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
      this.orderService.getOrders().subscribe(data=>{
        this.order = data;
      });
    }
  }
}
