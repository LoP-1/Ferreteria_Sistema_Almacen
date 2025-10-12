import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private apiUrl = 'http://localhost:8080/api/auth';
  private useMockAuth = true; // Mock de autenticación para desarrollo frontend
  private mockUsuarios: Usuario[] = [
    {
      id: 1,
      nombre: 'Ana Admin',
      email: 'admin@ferreteria.com',
      rol: 'Administrador'
    },
    {
      id: 2,
      nombre: 'Carlos Worker',
      email: 'worker@ferreteria.com',
      rol: 'Trabajador'
    }
  ];

  login(credentials: { email: string; password: string }): Observable<any> {
    if (!this.useMockAuth) {
      return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
        tap((response: any) => {
          this.persistSession(response.token, response.usuario);
        })
      );
    }

    const user = this.mockUsuarios.find(
      mockUser => mockUser.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!user) {
      return throwError(() => new Error('Credenciales inválidas en modo mock'));
    }

    const mockResponse = {
      token: 'mock-token',
      usuario: user
    };

    this.persistSession(mockResponse.token, mockResponse.usuario);

    return of(mockResponse);
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
    }
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('auth_token');
  }

  getUserRole(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    const user = localStorage.getItem('current_user');
    if (user) {
      const parsedUser: Usuario = JSON.parse(user);
      return parsedUser.rol;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  private persistSession(token: string, usuario: Usuario): void {
    if (!this.isBrowser) {
      return;
    }
    localStorage.setItem('auth_token', token);
    localStorage.setItem('current_user', JSON.stringify(usuario));
  }
}