import { Component, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Provider, ProveedorPayload } from '../../services/provider';
import { finalize } from 'rxjs';
interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}
@Component({
  selector: 'app-provider-form',

  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './provider-form.html',
  styleUrl: './provider-form.css'
})
export class ProviderForm {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private providerService = inject(Provider);

  isSubmitting = false; // Controla el estado visual de "enviando"

  notification: Notification = {
    show: false,
    message: '',
    type: 'success'
  };

  // --- DEFINICIÓN DEL FORMULARIO REACTIVO ---
  // He añadido 'ruc' y 'description' al formulario para que coincida con ProveedorPayload
  providerForm = this.fb.group({
    nombreEmpresa: ['', [Validators.required, Validators.minLength(3)]], // Mapeado a 'nombreEmpresa'
    ruc: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]], // Agregado RUC
    contactoNombre: ['', Validators.required], // Mapeado a 'contactoNombre'
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Mapeado a 'telefono'
    descripcion: ['', [Validators.maxLength(250)]], // Agregado 'descripcion'
    category: ['Construcción', Validators.required],
    reliability: [85, Validators.required],
  });


  saveProvider(): void {
    if (this.providerForm.invalid) {
      this.providerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.hideNotification();

    const payload: ProveedorPayload = {
      nombreEmpresa: this.providerForm.value.nombreEmpresa!,
      ruc: this.providerForm.value.ruc!,
      contactoNombre: this.providerForm.value.contactoNombre!,
      email: this.providerForm.value.email!,
      telefono: this.providerForm.value.telefono!,
      descripcion: this.providerForm.value.descripcion!,
    };

    // 4. Llamada al servicio
    this.providerService.agregarProveedor(payload)
    .pipe(
        
        finalize(() => this.isSubmitting = false)
      )
      .subscribe({
        next: (respuesta) => {
          console.log('✅ Proveedor agregado:', respuesta);
          
          // 1. Mostrar mensaje de éxito
          this.showNotification('¡Proveedor registrado con éxito! Redirigiendo...', 'success');
          
          // 2. Resetear el formulario
          this.providerForm.reset({ category: 'Construcción' });

          // 3. Redirigir después de un breve momento para que el usuario lea el mensaje
          setTimeout(() => {
            this.router.navigate(['dashboard/providers']);
          }, 2000); // 2 segundos de espera
        },
        error: (error) => {
          console.error('❌ Error al agregar proveedor:', error);
          // 4. Mostrar un mensaje de error claro al usuario
          this.showNotification('Error al registrar el proveedor. Por favor, inténtelo de nuevo.', 'error');
        }
      });
  }

  goBack(): void {
    this.router.navigate(['dashboard/providers']); // Ajusta la ruta si es necesario
  }
   private showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { show: true, message, type };
  }
  hideNotification(): void {
    this.notification.show = false;
  }
}
