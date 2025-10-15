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
  encapsulation: ViewEncapsulation.None
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isLoading = false;
  // 2. Propiedad para mostrar/ocultar la contraseña
  passwordVisible = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: Auth
  ) {
    
  }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      // ... otros controles (ej. 'email', 'password')
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required],
      // 🛑 ESTA LÍNEA DEBE EXISTIR Y COINCIDIR CON EL NOMBRE DEL HTML
      'rememberMe': [false] // o [false, [Validators.required]] si es necesario
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
    this.isLoading = true; // ⚠️ Nota 1: Inicio de isLoading
    // Credenciales de prueba locales
    const USUARIO_VALIDO = 'usuario@ejemplo.com';
    const CONTRASENA_VALIDA = '123';

    const emailIngresado = this.loginForm.value.email;
    const passwordIngresada = this.loginForm.value.password;

    // SIMULACIÓN DE LOGIN LOCAL PARA PRUEBAS
    if (emailIngresado === USUARIO_VALIDO && passwordIngresada === CONTRASENA_VALIDA) {
      // Éxito simulado: Navegar al dashboard
      console.log('Login local exitoso con usuario de prueba.');
      this.isLoading = false;
      this.router.navigate(['/dashboard']);

      // *** OPCIONAL: Puedes añadir una línea aquí para que no siga evaluando el código del servicio.
      return;

    } else if (emailIngresado === USUARIO_VALIDO && passwordIngresada !== CONTRASENA_VALIDA) {
      // Manejo de error local de contraseña
      console.error('Error de login: Contraseña incorrecta.');
      this.isLoading = false;
      // Opcional: Podrías mostrar un mensaje de error en la UI aquí
      return;

    }
    // FIN DE SIMULACIÓN DE LOGIN LOCAL

    // Si la simulación local no se cumplió, entonces intenta con el servicio (Lógica original)
    const datosLogin = {
      email: emailIngresado,
      contraseña: passwordIngresada
    };

    this.authService.login(datosLogin).subscribe({
      next: (respuesta) => {
        console.log('Login exitoso con servicio!', respuesta);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error en login con servicio:', error);
        this.isLoading = false;
        // Nota: Asegúrate de que tu interfaz de usuario maneje este error
      }
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
}