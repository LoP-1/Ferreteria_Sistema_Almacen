import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Product {
  id: number;
  code: string;
  name: string;
  category: 'Herramientas' | 'Pinturas' | 'Construcción' | 'Electricidad' | 'Fijaciones';
  price: number;
  stock: number;
  supplier: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  // --- Variables de Estado de la UI ---
  isModalOpen = false;
  selectedProduct: Product | null = null;

  // --- Datos Ficticios (Mock Data) ---
  products: Product[] = [
    { id: 1, code: 'HERR-001', name: 'Taladro Percutor Inalámbrico 20V', category: 'Herramientas', price: 199.90, stock: 45, supplier: 'ToolMaster Pro', imageUrl: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Taladro', description: 'Potente taladro con dos baterías de litio y maletín de transporte.' },
    { id: 2, code: 'PINT-015', name: 'Pintura Látex Blanca (Galón)', category: 'Pinturas', price: 55.00, stock: 120, supplier: 'ColorLife', imageUrl: 'https://via.placeholder.com/150/003366/FFFFFF?text=Pintura', description: 'Pintura de alta cubrición y acabado mate, ideal para interiores.' },
    { id: 3, code: 'CONS-032', name: 'Bolsa de Cemento Sol (42.5kg)', category: 'Construcción', price: 28.50, stock: 250, supplier: 'Cementos Fortaleza', imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=Cemento', description: 'Cemento Portland Tipo I para construcciones de alta resistencia.' },
    { id: 4, code: 'FIJA-101', name: 'Caja de Tornillos Autorroscantes (500u)', category: 'Fijaciones', price: 35.00, stock: 8, supplier: 'FijaTodo S.A.', imageUrl: 'https://via.placeholder.com/150/F2F2F2/333333?text=Tornillos', description: 'Tornillos de acero galvanizado para madera y metal.' },
    { id: 5, code: 'ELEC-007', name: 'Rollo de Cable Eléctrico #12 (100m)', category: 'Electricidad', price: 180.00, stock: 60, supplier: 'ElectroConductores', imageUrl: 'https://via.placeholder.com/150/CC0000/FFFFFF?text=Cable', description: 'Cable de cobre flexible para instalaciones eléctricas residenciales.' },
    { id: 6, code: 'HERR-002', name: 'Amoladora Angular 4 1/2"', category: 'Herramientas', price: 250.00, stock: 30, supplier: 'ToolMaster Pro', imageUrl: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Amoladora', description: 'Amoladora de 850W de potencia para corte y desbaste de metales.' },
    { id: 7, code: 'PINT-004', name: 'Lata de Spray Esmalte Negro Brillante', category: 'Pinturas', price: 15.00, stock: 0, supplier: 'ColorLife', imageUrl: 'https://via.placeholder.com/150/003366/FFFFFF?text=Spray', description: 'Esmalte acrílico de secado rápido para múltiples superficies.' },
    { id: 8, code: 'CONS-045', name: 'Plancha de Drywall 1/2"', category: 'Construcción', price: 42.00, stock: 150, supplier: 'ConstruRed', imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=Drywall', description: 'Plancha de yeso cartón estándar para tabiquería y cielos rasos.' },
    { id: 9, code: 'FIJA-205', name: 'Set de Tarugos y Anclajes', category: 'Fijaciones', price: 25.00, stock: 200, supplier: 'FijaTodo S.A.', imageUrl: 'https://via.placeholder.com/150/F2F2F2/333333?text=Tarugos', description: 'Kit completo con variedad de tarugos y tornillos para concreto.' },
    { id: 10, code: 'ELEC-011', name: 'Tomacorriente Doble con Puesta a Tierra', category: 'Electricidad', price: 8.50, stock: 500, supplier: 'ElectroConductores', imageUrl: 'https://via.placeholder.com/150/CC0000/FFFFFF?text=Toma', description: 'Tomacorriente de alta calidad para instalaciones seguras.' },
    { id: 11, code: 'HERR-010', name: 'Juego de Destornilladores (8 piezas)', category: 'Herramientas', price: 65.00, stock: 75, supplier: 'ToolMaster Pro', imageUrl: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Set', description: 'Set de destornilladores con punta magnética y mango ergonómico.' },
    { id: 12, code: 'PINT-021', name: 'Rodillo de Felpa 9"', category: 'Pinturas', price: 12.00, stock: 110, supplier: 'Pinturas El Sol', imageUrl: 'https://via.placeholder.com/150/003366/FFFFFF?text=Rodillo', description: 'Rodillo de alta densidad para un acabado uniforme y profesional.' },
    { id: 13, code: 'CONS-101', name: 'Tubo de PVC Desagüe 4"', category: 'Construcción', price: 22.00, stock: 90, supplier: 'Tuboplast', imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=Tubo', description: 'Tubo de PVC rígido para sistemas de desagüe y alcantarillado.' },
    { id: 14, code: 'HERR-015', name: 'Caja de Herramientas Plástica 19"', category: 'Herramientas', price: 85.00, stock: 15, supplier: 'ToolMaster Pro', imageUrl: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Caja', description: 'Caja de herramientas robusta con compartimentos y bandeja extraíble.' },
    { id: 15, code: 'ELEC-030', name: 'Cinta Aislante Negra 3M', category: 'Electricidad', price: 5.00, stock: 0, supplier: 'ElectroConductores', imageUrl: 'https://via.placeholder.com/150/CC0000/FFFFFF?text=Cinta', description: 'Cinta aislante de PVC de alta elasticidad y adherencia.' }
  ];

  // --- Métodos para controlar la UI ---

  /**
   * Abre el modal y muestra los detalles del producto seleccionado.
   * @param product El producto a mostrar.
   */
  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  /**
   * Cierra el modal de detalles del producto.
   */
  closeModal(): void {
    this.isModalOpen = false;
    // Pequeño delay para que la animación de salida se complete antes de limpiar el producto
    setTimeout(() => {
      this.selectedProduct = null;
    }, 300);
  }
}
