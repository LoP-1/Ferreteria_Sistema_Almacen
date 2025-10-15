import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  pageTitle = 'Añadir Nuevo Producto';
  
  // Datos de ejemplo para los <select>
  categories = ['Herramientas', 'Pinturas', 'Construcción', 'Electricidad', 'Fijaciones'];
  suppliers = ['ToolMaster Pro', 'ColorLife', 'Cementos Fortaleza', 'FijaTodo S.A.', 'ElectroConductores', 'ConstruRed'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', Validators.required],
      category: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      supplier: [null, Validators.required],
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
      this.productForm.setValue({
        name: 'Taladro Percutor Inalámbrico 20V',
        code: 'HERR-001',
        category: 'Herramientas',
        price: 199.90,
        stock: 45,
        supplier: 'ToolMaster Pro',
        description: 'Potente taladro con dos baterías de litio y maletín de transporte.'
      });
    }
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Formulario Enviado:', this.productForm.value);
      // Aquí iría la lógica para guardar o actualizar
      // Navegamos de vuelta a la lista tras el éxito
      this.router.navigate(['/products']); 
    } else {
      console.error('El formulario no es válido.');
      // Opcional: marcar todos los campos como "tocados" para mostrar errores
      this.productForm.markAllAsTouched();
    }
  }
  
  /**
   * Navega de vuelta a la lista de productos.
   */
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
