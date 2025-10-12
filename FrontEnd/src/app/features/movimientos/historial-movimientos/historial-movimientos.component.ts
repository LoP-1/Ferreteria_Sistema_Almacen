import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modelo de datos temporal para un movimiento
export interface Movimiento {
  id: number;
  tipo: 'Entrada' | 'Salida';
  producto_nombre: string;
  cantidad: number;
  empleado_nombre: string;
  fecha: Date;
}

@Component({
  selector: 'app-historial-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-movimientos.component.html',
  styleUrls: ['./historial-movimientos.component.scss']
})
export class HistorialMovimientosComponent implements OnInit {

  movimientos: Movimiento[] = [];
  filteredMovimientos: Movimiento[] = [];
  searchTerm = '';

  ngOnInit(): void {
    // Usamos datos de ejemplo. Más adelante, un 'MovimientoService' traerá estos datos.
    this.movimientos = [
      { id: 1, tipo: 'Entrada', producto_nombre: 'Martillo de bola', cantidad: 50, empleado_nombre: 'Admin Principal', fecha: new Date('2025-10-12T09:30:00') },
      { id: 2, tipo: 'Salida', producto_nombre: 'Destornillador estrella', cantidad: 10, empleado_nombre: 'Juan Perez', fecha: new Date('2025-10-12T10:15:00') },
      { id: 3, tipo: 'Salida', producto_nombre: 'Alicate de presión', cantidad: 5, empleado_nombre: 'Juan Perez', fecha: new Date('2025-10-11T16:45:00') },
      { id: 4, tipo: 'Entrada', producto_nombre: 'Cinta métrica 5m', cantidad: 100, empleado_nombre: 'Admin Principal', fecha: new Date('2025-10-11T11:20:00') },
    ];

    this.filteredMovimientos = [...this.movimientos];
  }

  // Función para aplicar una clase CSS dependiendo del tipo de movimiento
  getTipoClase(tipo: 'Entrada' | 'Salida'): string {
    return tipo === 'Entrada' ? 'tipo-entrada' : 'tipo-salida';
  }

  onBuscar(): void {
    const termino = this.searchTerm.trim().toLowerCase();
    if (!termino) {
      this.filteredMovimientos = [...this.movimientos];
      return;
    }

    this.filteredMovimientos = this.movimientos.filter(movimiento => {
      const campos = [
        movimiento.tipo,
        movimiento.producto_nombre,
        movimiento.empleado_nombre,
        movimiento.fecha.toLocaleDateString(),
        movimiento.fecha.toLocaleTimeString()
      ];
      return campos.some(valor => valor.toLowerCase().includes(termino));
    });
  }
}