import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface MovimientoReciente {
  id: number;
  tipo: 'Entrada' | 'Salida';
  producto: string;
  cantidad: number;
  hora: string;
}

interface TareaPendiente {
  id: number;
  descripcion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
}

type QuickActionIcon = 'salida' | 'entrada' | 'consulta';

interface QuickAction {
  label: string;
  description: string;
  icon: QuickActionIcon;
  handler: () => void;
}

@Component({
  selector: 'app-operaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.scss']
})
export class OperacionesComponent {
  private router = inject(Router);

  turnoActual = {
    responsable: 'Carlos Worker',
    horario: '08:00 - 17:00',
    ubicacion: 'Almacén Central'
  };

  quickActions: QuickAction[] = [
    {
      label: 'Registrar salida',
      description: 'Descontar productos del inventario.',
      icon: 'salida',
      handler: () => this.navigateToMovimiento('Salida')
    },
    {
      label: 'Registrar entrada',
      description: 'Añadir nuevos productos al stock.',
      icon: 'entrada',
      handler: () => this.navigateToMovimiento('Entrada')
    },
    {
      label: 'Consultar producto',
      description: 'Buscar un artículo por SKU o nombre.',
      icon: 'consulta',
      handler: () => this.navigateToInventario()
    }
  ];

  movimientosRecientes: MovimientoReciente[] = [
    { id: 1, tipo: 'Entrada', producto: 'Tubos PVC 1"', cantidad: 120, hora: '09:35' },
    { id: 2, tipo: 'Salida', producto: 'Taladro inalámbrico', cantidad: 4, hora: '10:10' },
    { id: 3, tipo: 'Salida', producto: 'Guantes de seguridad', cantidad: 15, hora: '11:05' }
  ];

  tareasPendientes: TareaPendiente[] = [
    { id: 1, descripcion: 'Verificar stock mínimo de abrasivos', prioridad: 'Alta' },
    { id: 2, descripcion: 'Preparar pedido para obra San Isidro', prioridad: 'Media' },
    { id: 3, descripcion: 'Actualizar etiquetas de estantería A3', prioridad: 'Baja' }
  ];

  private navigateToMovimiento(tipo: 'Entrada' | 'Salida'): void {
    this.router.navigate(['/worker/registro-movimiento'], { queryParams: { tipo } });
  }

  navigateToInventario(): void {
    this.router.navigate(['/worker/inventario']);
  }
}