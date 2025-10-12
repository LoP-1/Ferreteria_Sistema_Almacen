import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/productos';
  // Mock temporal para desarrollo frontend; reemplazar cuando el backend esté disponible
  private mockProductos: Producto[] = [
    {
      id_producto: 1,
      codigo_sku: 'TL-20V-001',
      nombre: 'Taladro inalámbrico',
      descripcion: 'Taladro inalámbrico 20V con batería y cargador',
      precio_compra: 299.9,
      stock_actual: 15,
      stock_minimo: 5
    },
    {
      id_producto: 2,
      codigo_sku: 'JD-032-002',
      nombre: 'Juego de destornilladores',
      descripcion: 'Set de destornilladores de precisión 32 piezas',
      precio_compra: 89.5,
      stock_actual: 42,
      stock_minimo: 10
    },
    {
      id_producto: 3,
      codigo_sku: 'CL-2IN-003',
      nombre: 'Caja de clavos 2"',
      descripcion: 'Caja de clavos de 2 pulgadas, 1kg',
      precio_compra: 24.9,
      stock_actual: 120,
      stock_minimo: 30
    }
  ];

  // Obtiene todos los productos del backend
  getProductos(): Observable<Producto[]> {
    return of(this.mockProductos);
  }

  // En el futuro, añadirás más métodos aquí:
  // createProducto(producto: Producto): Observable<Producto> { ... }
  // deleteProducto(id: number): Observable<void> { ... }
}

export type { Producto };
