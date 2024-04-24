import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

import { Category, Product, Order } from '../models';
import { ProductService } from '../services/product.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [NgFor, NgIf, NavbarComponent, FormsModule],
  templateUrl: './product-manager.component.html',
  styleUrl: './product-manager.component.css'
})
export class ProductManagerComponent implements OnInit{

  products:Product[]=[];
  categories:Category[]=[];
  orders: Order[]=[];
  id:number = 0;
  name:string ='';
  description: string='';

  constructor(private productService:ProductService,
              private oderService:OrderService
  ){}

  ngOnInit(): void {
    this.getProducts();
    this.getOrders();
    this.getCategories();
  }

  getProducts(){
      this.productService.getProducts().subscribe(data=>{
        this.products = data;
      })
  }

  getCategories(){
    this.productService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }


  getOrders(){
    this.oderService.getOrders().subscribe(data=>{
      this.orders = data;
    })
  }
  
  onSubmit(){
    this.productService.addCategory(this.name, this.description).subscribe({});
    window.location.reload();
  }

  addProduct(product: Product): void {
    this.productService.createProduct(product).subscribe(
      (data: Product) => {
        console.log('Product added successfully:', data);
        this.getProducts();
      },
      (error) => {
        console.error('Error adding product:', error);
      }
    );
  }

  // Update Product Function
  updateProduct(id: number, product: Product): void {
    product.is_verified = true;
    this.productService.updateProduct(id, product).subscribe(
      (data: Product) => {
        console.log('Product updated successfully:', data);
        this.getProducts();
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  // Delete Product Function
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        console.log('Product deleted successfully');
        // Optionally, you can refresh the product list after deleting
        this.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
