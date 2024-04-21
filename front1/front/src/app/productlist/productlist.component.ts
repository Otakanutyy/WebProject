import { Component } from '@angular/core';
import { Category, Product, ProductPicture } from '../models';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

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
                private order: OrderService
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
      this.order.addtoCart(id);
    }
}
