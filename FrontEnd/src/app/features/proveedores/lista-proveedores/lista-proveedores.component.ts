import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Modelo de datos temporal para un proveedor
export interface Proveedor {
  id: number;
  nombre_empresa: string;
  ruc: string;
  contacto_nombre: string;
  telefono: string;
  email: string;
  descripcion_oferta: string;
}

@Component({
  selector: 'app-lista-proveedores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.scss']
})
export class ListaProveedoresComponent implements OnInit {
  private fb = inject(FormBuilder);

  proveedores: Proveedor[] = [];
  proveedorForm: FormGroup = this.fb.group({
    id: [null],
    nombre_empresa: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    contacto_nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    descripcion_oferta: ['', [Validators.required]]
  });
  showEditModal = false;
  showDeleteModal = false;
  proveedorSeleccionado: Proveedor | null = null;

  ngOnInit(): void {
    // Por ahora, usamos datos de ejemplo.
    // Más adelante, crearás un 'ProveedorService' para traer estos datos del backend.
    this.proveedores = [
      {
        id: 1,
        nombre_empresa: 'Aceros Arequipa',
        ruc: '20100035821',
        contacto_nombre: 'Carlos Solis',
        telefono: '987654321',
        email: 'contacto@acerosarequipa.com',
        descripcion_oferta: 'Perfiles metálicos, barras de acero, planchas laminadas'
      },
      {
        id: 2,
        nombre_empresa: 'Cemex Perú',
        ruc: '20454848481',
        contacto_nombre: 'Maria Lopez',
        telefono: '912345678',
        email: 'ventas@cemexperu.com',
        descripcion_oferta: 'Cemento Portland, concreto premezclado, aditivos'
      },
      {
        id: 3,
        nombre_empresa: 'Pavco Perú',
        ruc: '20100124345',
        contacto_nombre: 'Jorge Diaz',
        telefono: '998877665',
        email: 'servicio@pavco.com.pe',
        descripcion_oferta: 'Tuberías PVC, sistemas de drenaje, accesorios hidráulicos'
      }
    ];
  }

  onEditar(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;
    this.proveedorForm.reset({ ...proveedor });
    this.showEditModal = true;
  }

  onEliminar(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;
    this.showDeleteModal = true;
  }

  onAgregar(): void {
    this.proveedorSeleccionado = null;
    this.proveedorForm.reset();
    this.showEditModal = true;
  }

  confirmarEliminar(): void {
    if (!this.proveedorSeleccionado) {
      return;
    }
    this.proveedores = this.proveedores.filter(p => p.id !== this.proveedorSeleccionado!.id);
    this.cerrarModales();
  }

  onSubmit(): void {
    if (this.proveedorForm.invalid) {
      this.proveedorForm.markAllAsTouched();
      return;
    }

    const formValue = this.proveedorForm.getRawValue() as Proveedor;

    if (this.proveedorSeleccionado) {
      this.proveedores = this.proveedores.map(proveedor =>
        proveedor.id === formValue.id ? { ...proveedor, ...formValue } : proveedor
      );
    } else {
      const nuevoId = Math.max(0, ...this.proveedores.map(p => p.id)) + 1;
      this.proveedores = [...this.proveedores, { ...formValue, id: nuevoId }];
    }

    this.cerrarModales();
  }

  cerrarModales(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.proveedorSeleccionado = null;
  }
}