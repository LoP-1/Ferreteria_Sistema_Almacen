import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// --- Interfaces para tipado de datos ---
interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  supplier: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface Customer {
  id: number;
  name: string;
  ruc: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-warehouse-out-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warehouse-out-form.html',
  styleUrl: './warehouse-out-form.css'
})
export class WarehouseOutForm {

  // --- Variables de Estado para la UI ---
  isProductModalOpen: boolean = false;
  isCustomerDropdownOpen: boolean = false;
  selectedCustomer: Customer | null = null;
  cart: CartItem[] = [];

  // --- Datos Ficticios (Mocks) ---
  customers: Customer[] = [
    { id: 1, name: 'Constructora G&M S.A.C.', ruc: '20548796321', avatarUrl: 'https://i.pravatar.cc/150?u=constructora' },
    { id: 2, name: 'Acabados & Diseño EIRL', ruc: '20123456789', avatarUrl: 'https://i.pravatar.cc/150?u=acabados' },
    { id: 3, name: 'Servicios Generales "El Martillo"', ruc: '10987654321', avatarUrl: 'https://i.pravatar.cc/150?u=martillo' }
  ];

  allProducts: Product[] = [
    { id: 'FER-001', name: 'Tornillos Autorroscantes 1/2"', category: 'Fijaciones', stock: 1500, price: 0.15, supplier: 'Importaciones Fieras' },
    { id: 'PNT-002', name: 'Pintura Látex Blanca 1 Galón', category: 'Pinturas', stock: 80, price: 45.50, supplier: 'CPP' },
    { id: 'HER-003', name: 'Taladro Percutor Inalámbrico 18V', category: 'Herramientas Eléctricas', stock: 25, price: 399.90, supplier: 'Bosch' },
    { id: 'CON-004', name: 'Bolsa de Cemento Sol 42.5kg', category: 'Construcción', stock: 200, price: 28.00, supplier: 'Unacem' },
    { id: 'ELE-005', name: 'Cable Indeco #14 AWG (Rollo 100m)', category: 'Electricidad', stock: 50, price: 180.00, supplier: 'Indeco' },
    { id: 'GAS-006', name: 'Kit de Gasfitería Básico', category: 'Gasfitería', stock: 40, price: 75.00, supplier: 'Vainsa' },
    { id: 'SEG-007', name: 'Guantes de Seguridad Multiflex', category: 'Seguridad', stock: 300, price: 12.50, supplier: '3M' },
    { id: 'PNT-008', name: 'Lija de Agua N° 220', category: 'Pinturas', stock: 1200, price: 1.50, supplier: 'Norton' },
    { id: 'HER-009', name: 'Disco de Corte para Metal 4.5"', category: 'Herramientas', stock: 500, price: 5.00, supplier: 'Dewalt' },
    { id: 'FIJ-010', name: 'Tarugos de Plástico 1/4"', category: 'Fijaciones', stock: 0, price: 0.10, supplier: 'Anclajes Peru' },
    { id: 'CON-011', name: 'Ladrillo Pandereta (Unidad)', category: 'Construcción', stock: 5000, price: 1.20, supplier: 'Ladrillos Lark' },
    { id: 'ELE-012', name: 'Tomacorriente Doble con Puesta a Tierra', category: 'Electricidad', stock: 150, price: 8.50, supplier: 'Bticino' },
    { id: 'HER-013', name: 'Wincha de 5 metros', category: 'Herramientas', stock: 90, price: 22.00, supplier: 'Stanley' },
    { id: 'GAS-014', name: 'Cinta Teflón 1/2"', category: 'Gasfitería', stock: 450, price: 2.00, supplier: 'Pavco' },
    { id: 'PNT-015', name: 'Brocha de 3 pulgadas', category: 'Pinturas', stock: 120, price: 9.00, supplier: 'Astor' }
  ];

  constructor() {
    // Selecciona un cliente por defecto para la demo
    this.selectedCustomer = this.customers[0];
  }

  // --- Métodos para controlar la UI ---
  toggleProductModal() {
    this.isProductModalOpen = !this.isProductModalOpen;
  }

  toggleCustomerDropdown() {
    this.isCustomerDropdownOpen = !this.isCustomerDropdownOpen;
  }

  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    this.isCustomerDropdownOpen = false;
  }

  // --- Métodos para la lógica del "Carrito" ---
  addProductToCart(product: Product) {
    if (product.stock === 0) return; // No se puede agregar si no hay stock

    const existingItem = this.cart.find(item => item.product.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      this.cart.push({ product: product, quantity: 1 });
    }
  }

  updateQuantity(item: CartItem, amount: number) {
    const newQuantity = item.quantity + amount;
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      item.quantity = newQuantity;
    }
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
  }

  // --- Métodos de cálculo ---
  get totalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalValue(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  // --- Método de utilidad para el Stock ---
  getStockStatus(stock: number): 'ok' | 'low' | 'out' {
    if (stock === 0) return 'out';
    if (stock <= 50) return 'low';
    return 'ok';
  }
  trackByProductId(index: number, item: CartItem): string {
    return item.product.id;
  }
}
