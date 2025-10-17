import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  passwordVisible = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth
  ) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    // Simulación rápida y demo
    //const USUARIO_VALIDO = 'usuario@ejemplo.com';
    //const CONTRASENA_VALIDA = '123';
    const emailIngresado = this.loginForm.value.email;
    const passwordIngresada = this.loginForm.value.password;
    const datosLogin = { email: emailIngresado, contraseña: passwordIngresada };
    this.authService.login(datosLogin).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => { this.isLoading = false; }
    });
  }
  get formControls() { return this.loginForm.controls; }
}