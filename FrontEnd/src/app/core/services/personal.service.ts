import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Empleado } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/personal';
  private useMock = true;

  private mockPersonal: Empleado[] = [
    {
      id_empleado: 1,
      nombres: 'Ana',
      apellidos: 'Ramírez Torres',
      email: 'ana.ramirez@ferreteria.com',
      telefono: '987654321',
      rol: 'Administrador'
    },
    {
      id_empleado: 2,
      nombres: 'Luis',
      apellidos: 'Pérez Maldonado',
      email: 'luis.perez@ferreteria.com',
      telefono: '912345678',
      rol: 'Trabajador'
    },
    {
      id_empleado: 3,
      nombres: 'María',
      apellidos: 'Gómez Alarcón',
      email: 'maria.gomez@ferreteria.com',
      telefono: '998877665',
      rol: 'Trabajador'
    }
  ];

  getPersonal(): Observable<Empleado[]> {
    if (this.useMock) {
      return of(this.mockPersonal);
    }
    return this.http.get<Empleado[]>(this.apiUrl);
  }
}