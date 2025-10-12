import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from '../../../core/models/empleado.model';
import { PersonalService } from '../../../core/services/personal.service';

@Component({
  selector: 'app-lista-personal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lista-personal.component.html',
  styleUrls: ['./lista-personal.component.scss']
})
export class ListaPersonalComponent implements OnInit {
  private personalService = inject(PersonalService);
  private fb = inject(FormBuilder);

  personal: Empleado[] = [];
  editForm: FormGroup = this.fb.group({
    id_empleado: [null],
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    rol: ['Trabajador', [Validators.required]]
  });
  showEditModal = false;
  showDeleteModal = false;
  empleadoSeleccionado: Empleado | null = null;

  ngOnInit(): void {
    this.personalService.getPersonal().subscribe(data => {
      this.personal = data;
    });
  }

  onAgregar(): void {
    this.empleadoSeleccionado = null;
    this.editForm.reset({ rol: 'Trabajador' });
    this.showEditModal = true;
  }

  onEditar(empleado: Empleado): void {
    this.empleadoSeleccionado = empleado;
    this.editForm.reset({ ...empleado });
    this.showEditModal = true;
  }

  onEliminar(empleado: Empleado): void {
    this.empleadoSeleccionado = empleado;
    this.showDeleteModal = true;
  }

  confirmarEliminar(): void {
    if (!this.empleadoSeleccionado) {
      return;
    }
    this.personal = this.personal.filter(p => p.id_empleado !== this.empleadoSeleccionado!.id_empleado);
    this.cerrarModales();
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formValue = this.editForm.getRawValue() as Empleado;

    if (this.empleadoSeleccionado) {
      this.personal = this.personal.map(empleado =>
        empleado.id_empleado === formValue.id_empleado ? { ...empleado, ...formValue } : empleado
      );
    } else {
      const nuevoId = Math.max(0, ...this.personal.map(p => p.id_empleado)) + 1;
      this.personal = [...this.personal, { ...formValue, id_empleado: nuevoId }];
    }

    this.cerrarModales();
  }

  cerrarModales(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.empleadoSeleccionado = null;
  }
}