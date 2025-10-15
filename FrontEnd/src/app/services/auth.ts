import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

export interface UsuarioDTO {
  email: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
   private apiUrl = environment.apiUrl + '/auth/login';

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioDTO): Observable<string> {
    return this.http.post<string>(this.apiUrl, usuario);
  }
  
}
