import { Component, OnInit } from '@angular/core';
import { Wishlist, Product } from '../models';
import { WishlistService } from '../services/wishlist.service';
import { ProductService } from '../services/product.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgFor, NgIf],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  wishlist:Wishlist|undefined;
  product:Product|undefined;
  constructor(private wishlistService:WishlistService,
              private productService:ProductService,
  ){}

  ngOnInit(): void {
      this.getWishlist();
  }

  getWishlist() {
    this.wishlistService.getWishlist().subscribe(data => {
      this.wishlist = data;
    });
  }


  deleteProd(prodId:number){
    if(this.wishlist){
      let index = this.wishlist.products.findIndex(product => product.id === prodId);
      this.wishlist.products.splice(index, 1);
      console.log(this.wishlist);
      this.wishlistService.updateWishlist(this.wishlist).subscribe({});
    }
  }

  removeProduct(){}

  clearWishlist(){}
}
