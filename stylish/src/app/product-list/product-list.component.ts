import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule, RouterOutlet } from '@angular/router';

import { Category, Product } from '../models';

import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ProductPictureService } from '../services/productpicture.service';
import { OrderService } from '../services/order.service';
import { ProductPicture } from '../models';
import { Order } from '../models';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { error } from 'console';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule, 
            HttpClientModule, NgIf, FormsModule, NgFor],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
    products: Product[] = [];
    categories: any[] = [];
    selectedCategoryId: number | null = null;
    productPicturesDict: { [key: number]: ProductPicture } = {};
    picturesforproduct: ProductPicture | undefined;

    logged:Boolean = false;
    private newOrder : OrderService|undefined;

    constructor(private prodService: ProductService,
      private categoryService: CategoryService,
      private prodpicture: ProductPictureService,
      private order:OrderService,
      private user: UserService){
    }

    ngOnInit(): void {
        this.refresh();
        this.fetchCategories();
    }

    refresh(): void {
      if (this.selectedCategoryId) {
        this.prodService.getProductsByCategory(this.selectedCategoryId).subscribe(
          (data: Product[]) => {
            this.products = data;
            this.loadProductPictures();
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      } else {
        this.prodService.getProducts().subscribe(
          (data: Product[]) => {
            this.products = data;
            this.loadProductPictures();
          },
          (error) => {
            console.error('Error fetching products:', error);
          }
        );
      }
    }
  
    fetchCategories(): void {
      this.categoryService.getCategories().subscribe(
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
        this.prodpicture.getProductPicturesByProductId(product.id).subscribe(
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
  
  
    // Add Product Function
    addProduct(product: Product): void {
      this.prodService.createProduct(product).subscribe(
        (data: Product) => {
          console.log('Product added successfully:', data);
          // Optionally, you can refresh the product list after adding
          this.refresh();
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  
    // Update Product Function
    updateProduct(id: number, product: Product): void {
      this.prodService.updateProduct(id, product).subscribe(
        (data: Product) => {
          console.log('Product updated successfully:', data);
          // Optionally, you can refresh the product list after updating
          this.refresh();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  
    // Delete Product Function
    deleteProduct(id: number): void {
      this.prodService.deleteProduct(id).subscribe(
        () => {
          console.log('Product deleted successfully');
          // Optionally, you can refresh the product list after deleting
          this.refresh();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }

    addToCart(id: number){
      // this.newOrder = {
      //   "user" = "",
      //   "products" =""
      // }
      this.order.addOrder(1, id);
    }
}
