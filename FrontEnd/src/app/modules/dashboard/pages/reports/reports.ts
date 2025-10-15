import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
interface Producto {
  codigo: string;
  nombre: string;
  categoria: 'Herramientas' | 'Fijaciones' | 'Pinturas' | 'Eléctrico' | 'Materiales';
  stock: number;
  precio: number;
  proveedor: string;
  estado: 'OK' | 'Bajo' | 'Sin Stock';
  // Añadimos estas propiedades para resolver errores en el HTML original
  ventasMes: number; // Agregado para el pipe de ventas
  tendencia: 'up' | 'down' | 'stable'; // Agregado para el pipe de tendencia
}
interface Metrica {
  titulo: string;
  valor: string;
  icono: string; // Placeholder para iconos (ej. de Font Awesome)
  colorClass: string; // Para aplicar color de la paleta
}
@Component({
  selector: 'app-reports',
  imports: [CommonModule, NgFor, NgIf, NgClass, DecimalPipe],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class Reports implements OnInit {
  // === Datos Mock Realistas (Añadidas ventasMes y tendencia) ===
  productosClave: Producto[] = [
    { codigo: 'FER-001', nombre: 'Tornillos p/Madera 1"', categoria: 'Fijaciones', stock: 450, precio: 5.99, proveedor: 'FijarMax S.A.', estado: 'OK', ventasMes: 120, tendencia: 'up' },
    { codigo: 'HERR-015', nombre: 'Taladro Percutor 850W', categoria: 'Herramientas', stock: 12, precio: 89.99, proveedor: 'Potencia Pro', estado: 'OK', ventasMes: 5, tendencia: 'stable' },
    { codigo: 'PINT-005', nombre: 'Pintura Blanca Látex', categoria: 'Pinturas', stock: 25, precio: 25.50, proveedor: 'ColorVida', estado: 'OK', ventasMes: 15, tendencia: 'up' },
    { codigo: 'ELEC-040', nombre: 'Cable THHN #12 (Metro)', categoria: 'Eléctrico', stock: 80, precio: 0.75, proveedor: 'ConectaCorp', estado: 'Bajo', ventasMes: 60, tendencia: 'down' },
    { codigo: 'MAT-080', nombre: 'Cemento Portland (Saco)', categoria: 'Materiales', stock: 5, precio: 12.00, proveedor: 'ConstruFuerte', estado: 'Sin Stock', ventasMes: 2, tendencia: 'stable' },
    { codigo: 'HERR-022', nombre: 'Set de Llaves Combinadas', categoria: 'Herramientas', stock: 35, precio: 45.90, proveedor: 'Potencia Pro', estado: 'OK', ventasMes: 10, tendencia: 'up' },
    { codigo: 'FER-003', nombre: 'Clavos de Acero 3"', categoria: 'Fijaciones', stock: 180, precio: 3.50, proveedor: 'FijarMax S.A.', estado: 'OK', ventasMes: 40, tendencia: 'down' },
    { codigo: 'PINT-010', nombre: 'Esmalte Sintético Rojo', categoria: 'Pinturas', stock: 8, precio: 18.20, proveedor: 'ColorVida', estado: 'Bajo', ventasMes: 3, tendencia: 'up' },
    { codigo: 'ELEC-012', nombre: 'Interruptor Simple', categoria: 'Eléctrico', stock: 120, precio: 1.50, proveedor: 'ConectaCorp', estado: 'OK', ventasMes: 30, tendencia: 'stable' },
    { codigo: 'MAT-095', nombre: 'Lija Grano 100', categoria: 'Materiales', stock: 90, precio: 0.50, proveedor: 'ConstruFuerte', estado: 'OK', ventasMes: 50, tendencia: 'up' },
    { codigo: 'HERR-007', nombre: 'Metro Plegable 3m', categoria: 'Herramientas', stock: 55, precio: 7.99, proveedor: 'FijarMax S.A.', estado: 'OK', ventasMes: 20, tendencia: 'stable' },
    { codigo: 'ELEC-051', nombre: 'Toma Corriente Doble', categoria: 'Eléctrico', stock: 3, precio: 4.20, proveedor: 'ConectaCorp', estado: 'Sin Stock', ventasMes: 8, tendencia: 'down' },
    { codigo: 'FER-018', nombre: 'Remaches de Aluminio', categoria: 'Fijaciones', stock: 210, precio: 4.10, proveedor: 'FijarMax S.A.', estado: 'OK', ventasMes: 70, tendencia: 'up' },
    { codigo: 'PINT-025', nombre: 'Sellador de Silicona', categoria: 'Pinturas', stock: 15, precio: 10.50, proveedor: 'ColorVida', estado: 'Bajo', ventasMes: 12, tendencia: 'down' },
    { codigo: 'MAT-102', nombre: 'Rodillo para Pintar', categoria: 'Materiales', stock: 65, precio: 6.80, proveedor: 'ConstruFuerte', estado: 'OK', ventasMes: 25, tendencia: 'stable' },
  ];

  metricas: Metrica[] = [
    // ... Métricas sin cambios ...
    { titulo: 'Stock Total Unidades', valor: this.productosClave.reduce((acc, p) => acc + p.stock, 0).toString(), icono: '📦', colorClass: 'text-primary' },
    { titulo: 'Productos Críticos (Sin Stock)', valor: this.productosClave.filter(p => p.estado === 'Sin Stock').length.toString(), icono: '🚨', colorClass: 'text-accent-red' },
    { titulo: 'Productos Bajo Stock', valor: this.productosClave.filter(p => p.estado === 'Bajo').length.toString(), icono: '⚠️', colorClass: 'text-secondary' },
    { titulo: 'Valor Total Inventario ($)', valor: `$${this.productosClave.reduce((acc, p) => acc + (p.stock * p.precio), 0).toFixed(2)}`, icono: '💰', colorClass: 'text-accent-green' },
  ];
  


  // === Estados UI para Micro-interacciones (Variables corregidas) ===
  isModalOpen: boolean = false; // Corregido el nombre de la variable para el modal
  activeTab: 'inventario' | 'tendencias' | 'proveedores' = 'inventario';

  selectedProduct: Producto | null = null;
  
  constructor() { }

  ngOnInit(): void { }

  // === Métodos de Interacción UI ===

  openModal(product: Producto) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  // Método renombrado para claridad en el HTML
  getStockBadgeClass(estado: 'OK' | 'Bajo' | 'Sin Stock'): string {
    switch (estado) {
      case 'OK':
        return 'bg-accent-green/20 text-accent-green border-accent-green';
      case 'Bajo':
        return 'bg-secondary/20 text-secondary border-secondary';
      case 'Sin Stock':
        return 'bg-accent-red/20 text-accent-red border-accent-red';
      default:
        return 'bg-neutral-light/50 text-text-dark border-text-dark';
    }
  }

  // Método para la flecha de tendencia en la tabla
  getTendenciaColor(tendencia: 'up' | 'down' | 'stable'): string {
    switch (tendencia) {
      case 'up':
        return 'text-accent-green';
      case 'down':
        return 'text-accent-red';
      default:
        return 'text-text-dark/60';
    }
  }

  getAnimationClass(index: number): string {
    return `animate-fade-in-up delay-${index * 100}`;
  }
}
