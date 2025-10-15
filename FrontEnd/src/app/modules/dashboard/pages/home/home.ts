import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  supplier: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  standalone: true,
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home {
 // --- DATOS ESTADÍSTICOS PARA LAS TARJETAS ---
  kpi = {
    totalProducts: 138,
    dailySales: 2540.75,
    lowStockItems: 0, // Se calculará en ngOnInit
    newOrders: 12,
  };

  // --- DATOS MOCK DE PRODUCTOS ---
  allProducts: Product[] = [
    { id: 'FER-001', name: 'Taladro Percutor 20V', category: 'Herramientas Eléctricas', stock: 45, price: 129.99, supplier: 'ProTools S.A.', imageUrl: 'https://via.placeholder.com/150/FF6600/FFFFFF?text=Taladro' },
    { id: 'MAT-003', name: 'Bolsa de Cemento Sol', category: 'Construcción', stock: 8, price: 7.80, supplier: 'Cementos Peruanos', imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=Cemento' },
    { id: 'TOR-006', name: 'Tornillos Drywall (Caja)', category: 'Fijaciones', stock: 2, price: 15.00, supplier: 'Importaciones Universal', imageUrl: 'https://via.placeholder.com/150/999999/FFFFFF?text=Tornillos' },
    { id: 'PIN-009', name: 'Lija de Agua Grano 220', category: 'Pinturas', stock: 0, price: 0.50, supplier: 'Colores Andinos', imageUrl: 'https://via.placeholder.com/150/DDDDDD/000000?text=Lija' },
    { id: 'HER-010', name: 'Wincha Métrica 5m', category: 'Herramientas Manuales', stock: 60, price: 12.00, supplier: 'Herramientas Total', imageUrl: 'https://via.placeholder.com/150/FFCC00/000000?text=Wincha' },
    { id: 'SEG-007', name: 'Candado de Seguridad 50mm', category: 'Seguridad', stock: 95, price: 8.50, supplier: 'ProTools S.A.', imageUrl: 'https://via.placeholder.com/150/CC0000/FFFFFF?text=Candado' },
    { id: 'GAS-013', name: 'Cinta Teflón', category: 'Gasfitería', stock: 500, price: 0.40, supplier: 'Plastisur', imageUrl: 'https://via.placeholder.com/150/E0E0E0/000000?text=Teflon' },
    { id: 'ELE-012', name: 'Foco LED 12W', category: 'Electricidad', stock: 9, price: 2.10, supplier: 'Electroinca', imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Foco' },
  ];

  // Lista para mostrar en la tabla (solo productos críticos)
  criticalProducts: Product[] = [];

  ngOnInit(): void {
    // Filtramos los productos con stock bajo (<= 10) y los ordenamos por stock
    this.criticalProducts = this.allProducts
      .filter(p => p.stock <= 10)
      .sort((a, b) => a.stock - b.stock);
    
    // Actualizamos el contador para la tarjeta de KPI
    this.kpi.lowStockItems = this.criticalProducts.length;
  }
  
  // --- MÉTODOS AUXILIARES ---
  getStockStatusClass(stock: number): string {
    if (stock === 0) return 'bg-accent-red text-white';
    if (stock > 0 && stock <= 10) return 'bg-secondary text-white';
    return 'bg-accent-green text-white'; // Para otros contextos
  }
}
