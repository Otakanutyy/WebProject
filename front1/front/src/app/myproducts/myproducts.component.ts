import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-myproducts',
    standalone: true,
    templateUrl: './myproducts.component.html',
    styleUrl: './myproducts.component.css',
    imports: [NavbarComponent]
})
export class MyproductsComponent {

}
