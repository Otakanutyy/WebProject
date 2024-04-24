import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SellComponent } from './sell/sell.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
    {path: 'productList', component: ProductlistComponent, data: { title: 'Products List Page' },},
    {path: 'productList/:productId', component: ProductdetailComponent, data:{title:'Product Detail Page'}},
    {path: 'home', component: HomeComponent, data:{title:'Product Detail Page'}},
    {path: 'about', component: AboutComponent, data:{title:'Product Detail Page'}},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'cart', component: CartComponent, data:{title: 'cart Page'}},
    { path: 'login', component: LoginComponent, data:{title: 'cart Page'}},
    { path: 'signup', component: SignupComponent, data:{title: 'cart Page'}},
    { path: 'myorders', component: MyordersComponent, data:{title: 'cart Page'}},
    { path: 'myproducts', component: MyproductsComponent, data:{title: 'cart Page'}},
    { path: 'sell', component: SellComponent, data:{title: 'cart Page'}},
    { path: 'profile', component: ProfileComponent, data:{title: 'cart Page'}},
    { path: 'login/loginManager', component: LoginManagerComponent, data:{title: 'cart Page'}},
    { path: 'mywishlist', component: WishlistComponent, data:{title: 'cart Page'}},
    { path: 'productManager', component: ProductManagerComponent, data:{title: 'cart Page'}},
];
