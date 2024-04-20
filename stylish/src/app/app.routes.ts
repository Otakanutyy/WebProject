import { Routes } from '@angular/router';

//components
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
    
    { path: 'productList', component: ProductListComponent, data: { title: 'Products List Page' },
        children:[
            // {path: ':productId', component: ProductDetailComponent, data:{title:'Product Detail Page'}}
        ] 
    },
    {path: 'productList/:productId', component: ProductDetailComponent, data:{title:'Product Detail Page'}},
    { path: 'about', component: AboutComponent, data:{title: 'About this Project Page'}},

    { path: 'cart', component: CartComponent, data:{title: 'cart Page'}},
    { path: 'login', component: LoginComponent, data:{title: 'cart Page'}},
    { path: 'signup', component: SignupComponent, data:{title: 'cart Page'}},
    { path: 'profile', component: ProfileComponent, data:{title: 'cart Page'}},
];
