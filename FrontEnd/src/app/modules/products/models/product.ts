export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string; // Stock Keeping Unit
}