import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NgIf, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logged: Boolean = false;
  
  constructor(private user:UserService){
  }
  
  logout(){
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.reload();
  }

  ngOnInit(): void {
      const access:string|null = localStorage.getItem("access");
      if(access){
        this.logged = true;
      }
  }
}
