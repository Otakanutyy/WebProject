import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product } from '../models';

@Component({
    selector: 'app-myproducts',
    standalone: true,
    templateUrl: './myproducts.component.html',
    styleUrl: './myproducts.component.css',
    imports: [NavbarComponent, NgFor, NgIf, FormsModule]
})
export class MyproductsComponent implements OnInit{

    products:Product[]=[];
    product1: Product|undefined;

    id: number = 0;
    name: string = '';
    description: string = '';
    price:number=0;
    brand: string = '';



    constructor(private productService:ProductService){}

    ngOnInit(): void {
        this.refresh();

    }

    refresh(){
        this.productService.getProductbyOwner().subscribe(data=>{
            this.products = data;
        })
    }

    deleteProd(id:number){
        this.productService.deleteProduct(id).subscribe({})
        this.refresh();
    }

    onSubmit() {
        this.product1 = this.products.find(product => product.id === this.id);

        if(this.product1){
            this.product1.brand =this.brand;
            this.product1.name =this.name;
            this.product1.description =this.description;
            this.product1.price =this.price;
            this.productService.updateProduct(this.product1.id, this.product1).subscribe({})
        } 
       this.refresh();  
    }
}
