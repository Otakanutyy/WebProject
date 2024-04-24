import { Component } from '@angular/core';
import { Category, Product, ProductPicture } from '../models';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { WishlistService } from '../services/wishlist.service';

@Component({
    selector: 'app-productlist',
    standalone: true,
    templateUrl: './productlist.component.html',
    styleUrl: './productlist.component.css',
    imports: [FormsModule, NgFor, NgIf, RouterModule, RouterOutlet, NavbarComponent]
})
export class ProductlistComponent {
  products: Product[] = [];
    categories: any[] = [];
    selectedCategoryId: number | null = null;
    productPicturesDict: { [key: number]: ProductPicture } = {};
    picturesforproduct: ProductPicture | undefined;

    logged:Boolean = false;
    private newOrder : OrderService|undefined;

    constructor(private prodService: ProductService,
                private order: OrderService, private wishlisService: WishlistService 
    ){
    }

    ngOnInit(): void {
        this.refresh();
        this.fetchCategories();
    }

    refresh(): void {
      if (this.selectedCategoryId) {
        this.prodService.getProductsByCategory(this.selectedCategoryId).subscribe(
          (data: Product[]) => {
            this.products = data.filter(product => product.is_verified);
            if(this.products.length!=0){
                this.loadProductPictures();
            }
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      } else {
        this.prodService.getProducts().subscribe(
          (data: Product[]) => {
            this.products = data.filter(product => product.is_verified);
            if(this.products.length!=0){
                this.loadProductPictures();
            }
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    }
  
    fetchCategories(): void {
      this.prodService.getCategories().subscribe(
        (data: Category[]) => {
          this.categories = data;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
    }

    loadProductPictures(): void {
      this.products.forEach(product => {
        this.prodService.getProductPicturesByProductId(product.id).subscribe(
          (data: ProductPicture) => {
            if (data && data.front_view) {
              this.productPicturesDict[product.id] = data;
            } else {
              console.error(`Product picture data for product ${product.id} is invalid.`);
            }
          },
          error => {
            console.error('Error fetching pictures for product:', error);
          }
        );
      });
    }
    
  
    onCategoryChange(categoryId: any): void {
      this.selectedCategoryId = categoryId ? +categoryId : null;
      this.refresh();
    }

    addToCart(id: number){
      this.order.addtoCart(id);
    }

    addtoWishlist(id:number){
      this.wishlisService.addToWishlist(id).subscribe({
        
      })
    }
}
