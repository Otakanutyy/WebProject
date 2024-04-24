import { Component, OnInit } from '@angular/core';
import {  Router, RouterOutlet, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule, NgClass, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logged: Boolean = false;
  isOpen: boolean = false;
  manager:string='';
  constructor(private user:UserService, private router: Router){
  }
  
  logout(){
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    if(this.manager){
      localStorage.removeItem("manager");
      // this.router.navigate([''])
    }
    window.location.reload();
  }

  ngOnInit(): void {
      const access:string|null = localStorage.getItem("access");
      if(access){
        this.logged = true;
      }

      const manager:string|null = localStorage.getItem("manager");
      if(manager == "yes"){
        this.manager = manager;
      }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
