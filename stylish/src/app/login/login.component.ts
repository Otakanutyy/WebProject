import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../services/user.service';

import { NgIf } from '@angular/common';
import { Token } from '../models';

import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logged: boolean = false;
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient,
              private user: UserService,
              private router: Router,
              private order: OrderService,
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
  }

  login(){
    this.user.login(this.username, this.password).subscribe((data: Token)=>{
      console.log(data);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      window.location.reload()
      this.order.addOrder();
    })
  }
}
