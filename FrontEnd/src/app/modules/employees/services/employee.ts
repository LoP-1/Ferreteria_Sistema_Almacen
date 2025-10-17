import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UsuarioDTO {
  apellidos: string
  contraseña: string
  dni: string
  email: string
  nombres: string
}
export interface Empleado {
  idEmpleado: number;
  nombres: string;
  apellidos: string;
  dni: string;
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class Employee {
  private apiUrl = environment.apiUrl + '/auth/registrar';
  private usersApiUrl = environment.apiUrl + '/auth/usuarios';

  constructor(private http: HttpClient) { }
  register(usuario: UsuarioDTO): Observable<string> {
    return this.http.post(this.apiUrl, usuario, { responseType: 'text' });
  }
  // 👇 Nueva función para obtener todos los usuarios
  getAllUsuarios(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.usersApiUrl);
  }
}
