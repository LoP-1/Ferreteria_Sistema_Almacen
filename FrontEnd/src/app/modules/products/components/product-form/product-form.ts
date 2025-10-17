import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product as ProductService, NewProduct } from '../../services/product';
import { finalize } from 'rxjs';
interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService); // <-- 2. Inyectamos el servicio

  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  pageTitle = 'Añadir Nuevo Producto';

  // Datos de ejemplo para los <select>
  categories = ['Herramientas', 'Pinturas', 'Construcción', 'Electricidad', 'Fijaciones'];
  suppliers = [
    { ruc: '10711137879', name: 'Delicia' },
    { ruc: '20554896321', name: 'ToolMaster Pro' },
    { ruc: '20457896321', name: 'ColorLife' },
    { ruc: '20131245789', name: 'Cementos Fortaleza' }
  ];

  isSubmitting = false;
  // 👇 3. Nuevos estados para manejar las notificaciones
  notification: Notification = {
    show: false,
    message: '',
    type: 'success'
  };

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required],
      category: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      // --- 👇 CORRECCIÓN: El control ahora manejará el RUC ---
      supplierRuc: [null, Validators.required],
      description: ['', Validators.maxLength(500)]
    });
  }

  ngOnInit(): void {
    // Comprueba si la URL contiene 'edit'
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.productId;

    if (this.isEditMode) {
      this.pageTitle = 'Editar Producto';
      // Aquí cargarías los datos del producto si tuvieras un servicio.
      // Por ahora, llenamos el formulario con datos de ejemplo.
      
    }
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.productForm.invalid) {
      console.error('El formulario no es válido.');
      this.productForm.markAllAsTouched();
      this.showNotification('Por favor, corrige los errores en el formulario.', 'error');
      return;
    }

    // --- 3. Transformamos los datos del formulario al formato que el backend espera ---
    const formValue = this.productForm.value;
    const newProductPayload: NewProduct = {
      nombre: formValue.name,
      codigoSku: formValue.code,
      categoria: formValue.category,
      precioCompra: Number(formValue.price || 0),
      stockInicial: Number(formValue.stock || 0), // Mapeado a 'stockInicial'
      descripcion: formValue.description,
      stockMinimo: 5,
      rucProveedor: formValue.supplierRuc // Mapeado a 'rucProveedor'
    };
    console.log('➡️ Payload enviado al backend:', JSON.stringify(newProductPayload, null, 2));
    // --- 4. Llamamos al servicio para crear el producto ---
    this.productService.addProduct(newProductPayload).pipe(
            // El bloque finalize se ejecuta siempre, al completar o al dar error
            finalize(() => this.isSubmitting = false)
          )
          .subscribe({
            next: (response) => {
              // Éxito
              console.log('✅ Producto agregado:', response);
              this.showNotification('¡Producto registrado con éxito! Redirigiendo...', 'success');
              this.productForm.reset();
              // Redirigir después de 2 segundos para que el usuario vea el mensaje
              setTimeout(() => {
                this.router.navigate(['/dashboard/products']);
              }, 2000);
            },
            error: (err) => {
              // Error
              console.error('❌ Error al agregar el producto:', err);
              this.showNotification('Hubo un error al crear el producto.', 'error');
            }
          });
        }
  goBack(): void {
    this.router.navigate(['/dashboard/products']);  
  }
  private showNotification(message: string, type: 'success' | 'error'): void {
    this.notification = { show: true, message, type };
  }
  hideNotification(): void {
    this.notification.show = false;
  }
}
