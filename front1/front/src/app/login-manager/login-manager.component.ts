import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Token } from '../models';

@Component({
  selector: 'app-login-manager',
  standalone: true,
  imports: [NavbarComponent, FormsModule, NgIf, RouterOutlet, RouterModule],
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent implements OnInit{
  logged: boolean = false;
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient,
              private user: UserService,
              private router: Router,
  ){

  }

  ngOnInit(): void {
    const access:string|null = localStorage.getItem("access");
    if(access){
      this.logged = true;
      this.router.navigate(['/productManager'])
    }
    else{
      this.logged = false;
    }
  }

  login(){
    this.user.managerLogin(this.username, this.password).subscribe((data: Token)=>{
      console.log(data);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("manager", "yes");
      window.location.reload()
    })
  }

}
