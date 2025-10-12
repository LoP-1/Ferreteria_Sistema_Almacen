import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    // Si el formulario es inválido, no hace nada
    if (this.loginForm.invalid) {
      return;
    }

    // Llama al servicio de autenticación con los datos del formulario
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Si el login es exitoso, redirige según el rol
        if (response.usuario.rol === 'Administrador') {
          this.router.navigate(['/admin']);
        } else if (response.usuario.rol === 'Trabajador') {
          this.router.navigate(['/worker']);
        }
      },
      error: (err) => {
        // En caso de error, lo muestra en la consola
        console.error('Error en el login:', err);
        // Aquí podrías añadir una alerta para el usuario
      }
    });
  }
}