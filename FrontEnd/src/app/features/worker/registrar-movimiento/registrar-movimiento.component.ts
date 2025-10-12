import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';
import { ActivatedRoute } from '@angular/router';

interface MovimientoRegistrado {
  tipo: 'Entrada' | 'Salida';
  producto: string;
  cantidad: number;
  hora: string;
  notas?: string;
}

@Component({
  selector: 'app-registrar-movimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-movimiento.component.html',
  styleUrls: ['./registrar-movimiento.component.scss']
})
export class RegistrarMovimientoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);
  private route = inject(ActivatedRoute);

  productos: Producto[] = [];
  movimientosRecientes: MovimientoRegistrado[] = [];
  feedbackMessage = '';

  movimientoForm = this.fb.group({
    tipo: ['Salida', Validators.required],
    productoId: [null as number | null, Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]],
    notas: ['']
  });

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
    });

    const tipoQuery = this.route.snapshot.queryParamMap.get('tipo');
    if (tipoQuery === 'Entrada' || tipoQuery === 'Salida') {
      this.movimientoForm.patchValue({ tipo: tipoQuery });
    }
  }

  registrarMovimiento(): void {
    if (this.movimientoForm.invalid) {
      this.movimientoForm.markAllAsTouched();
      return;
    }

    const formValue = this.movimientoForm.value;
    const productoSeleccionado = this.productos.find(p => p.id_producto === formValue.productoId);
    if (!productoSeleccionado) {
      return;
    }

    const registro: MovimientoRegistrado = {
      tipo: formValue.tipo as 'Entrada' | 'Salida',
      producto: productoSeleccionado.nombre,
      cantidad: formValue.cantidad ?? 0,
      notas: formValue.notas ?? '',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.movimientosRecientes = [registro, ...this.movimientosRecientes].slice(0, 5);
    this.feedbackMessage = `Movimiento de ${registro.tipo.toLowerCase()} registrado para ${registro.producto}.`;

    const tipoActual = formValue.tipo as 'Entrada' | 'Salida';
    this.movimientoForm.reset({ tipo: tipoActual, productoId: null, cantidad: 1, notas: '' });

    setTimeout(() => {
      this.feedbackMessage = '';
    }, 4000);
  }

  get tipoControl() {
    return this.movimientoForm.get('tipo');
  }

  get productoControl() {
    return this.movimientoForm.get('productoId');
  }

  get cantidadControl() {
    return this.movimientoForm.get('cantidad');
  }
}
