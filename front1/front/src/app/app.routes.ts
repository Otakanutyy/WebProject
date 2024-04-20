import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';



export const routes: Routes = [
    {path: 'productList', component: ProductlistComponent, data: { title: 'Products List Page' },},
    {path: 'productList/:productId', component: ProductdetailComponent, data:{title:'Product Detail Page'}},

    { path: 'cart', component: CartComponent, data:{title: 'cart Page'}},
    { path: 'login', component: LoginComponent, data:{title: 'cart Page'}},
    { path: 'signup', component: SignupComponent, data:{title: 'cart Page'}},
];
