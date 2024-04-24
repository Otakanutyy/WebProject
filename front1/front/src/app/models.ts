export interface User {
    id: number;
    username: string;
}

export interface Profile {
    id: number;
    user_id: number;
    name: string;
    address: string;
    email: string;
}
  
export interface Category {
    id: number;
    name: string;
    description: string;
}
  
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number | null;
    brand: string;
    category_id: number;
    discount_percentage: number|null;
    owner_id: number;
    is_verified: boolean;
}
  
export interface ProductPicture {
    id: number;
    product_id: number;
    front_view: string | null;
    back_view: string | null;
    side_view: string | null;
}

export interface Order {
    id: number;
    user_id: number;
    products: Product[];
    total_price: number;
}

export interface Wishlist {
    user_id: number;
    products: Product[];
}
  
export interface Comment {
    id: number;
    user_id: number;
    product: Product;
    text: string;
    created_at: string;
}

export interface Token{
    refresh: string;
    access: string;
}
  
  