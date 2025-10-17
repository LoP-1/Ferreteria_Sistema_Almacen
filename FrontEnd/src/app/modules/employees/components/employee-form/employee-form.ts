import { Component, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importamos Router para la navegación
import { Employee as EmployeeService, UsuarioDTO } from '../../services/employee';
import { finalize } from 'rxjs';
interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgClass],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeForm {
  // --- INYECCIÓN DE DEPENDENCIAS Y ESTADO ---
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private employeeService = inject(EmployeeService); // 👈 2. Inyectamos el servicio


  isSubmitting = false;
  // 👇 3. Nuevos estados para manejar las notificaciones
  notification: Notification = {
    show: false,
    message: '',
    type: 'success'
  };


  // --- DEFINICIÓN DEL FORMULARIO REACTIVO ---
  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Validar 8 dígitos numéricos
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
    // Los campos 'position' y 'status' son para la UI, no se envían al backend
    position: ['', [Validators.required]],
    status: ['Activo', Validators.required]
  });

  // --- MÉTODOS ---

  // Método que se ejecuta al enviar el formulario
  saveEmployee(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hideNotification();

    // 👇 5. Construimos el objeto DTO para enviar a la API
    const formValue = this.employeeForm.value;
    const nameParts = formValue.name!.split(' ');
    const nombres = nameParts.slice(0, -1).join(' ') || nameParts[0]; // Todo menos el último es nombre
    const apellidos = nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''; // El último es apellido

    const newUser: UsuarioDTO = {
      nombres: nombres,
      apellidos: apellidos,
      dni: formValue.dni!,
      email: formValue.email!,
      contraseña: formValue.password!
    };

    // 👇 6. Llamamos al servicio de registro
    this.employeeService.register(newUser)
      .pipe(
        // El bloque finalize se ejecuta siempre, al completar o al dar error
        finalize(() => this.isSubmitting = false)
      )
      .subscribe({
        next: (response) => {
          // Éxito
          console.log('✅ Empleado agregado:', response);
          this.showNotification('¡Empleado registrado con éxito! Redirigiendo...', 'success');
          this.employeeForm.reset();
          // Redirigir después de 2 segundos para que el usuario vea el mensaje
          setTimeout(() => {
            this.router.navigate(['/dashboard/employees']);
          }, 2000);
        },
        error: (err) => {
          // Error
          console.error('❌ Error al agregar empleado:', err);
          this.showNotification('Error al registrar al empleado. Por favor, inténtelo de nuevo.', 'error');
        }
      });
  }

  // Método para navegar hacia atrás (a la lista)
  goBack(): void {
    // Asume que tu ruta de la lista es '/employee-list' o la que corresponda
    this.router.navigate(['/dashboard/employees']); 
  }
   private showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { show: true, message, type };
  }
  hideNotification(): void {
    this.notification.show = false;
  }
}
