import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface ProveedorPayload {
  nombreEmpresa: string;
  ruc: string;
  contactoNombre: string;
  telefono: string;
  email: string;
  descripcion: string;
}
@Injectable({
  providedIn: 'root'
})
export class Provider {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  agregarProveedor(proveedorData: ProveedorPayload): Observable<string> {
    
    const url = `${this.apiUrl}/proveedores/agregar`;
    return this.http.post(url, proveedorData, { responseType: 'text' });
  }
}
