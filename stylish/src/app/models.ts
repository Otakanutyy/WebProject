export interface CustomUser {
    id: number;
    name: string;
    email: string;
    address: string | null;
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
    discount_percentage: number;
    rating: number | null;
    stock: number;
    brand: string;
    category: Category;
}

export interface ProductPicture {
    id: number;
    product: Product;
    front_view: string;
    back_view: string;
    side_view: string;
}

export interface Order {
    id: number;
    user: CustomUser;
    products: Product[];
}

export interface Wishlist {
    user: CustomUser;
    products: Product[];
}

export interface Comment {
    id: number;
    user: CustomUser;
    product: Product;
    text: string;
    created_at: string; // Consider using a Date object if you need to perform date operations
}


export interface Token{
    refresh: string;
    access: string;
}