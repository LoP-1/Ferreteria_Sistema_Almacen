import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments'; // Asegúrate que la ruta sea correcta
export interface Proveedor {
  idProveedor: number;
  nombreEmpresa: string;
  ruc: string;
  contactoNombre: string;
  telefono: string;
  email: string;
  descripcion: string;
}

export interface BackendProduct {
  idProducto: number;
  codigoSku: string;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  stockActual: number;
  stockMinimo: number;
  categoria: string;
  proveedor: Proveedor;
}
export interface NewProduct {
  codigoSku: string;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  stockInicial: number; // Renombrado de stockActual
  stockMinimo: number;
  categoria: string;
  rucProveedor: string; // Cambiado desde el objeto anidado
}
@Injectable({
  providedIn: 'root'
})
export class Product {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/productos`;
  getProducts(): Observable<BackendProduct[]> {
    return this.http.get<BackendProduct[]>(this.apiUrl);
  }
  addProduct(productData: NewProduct): Observable<string> {
    return this.http.post(this.apiUrl, productData, { responseType: 'text' });
  }
}
