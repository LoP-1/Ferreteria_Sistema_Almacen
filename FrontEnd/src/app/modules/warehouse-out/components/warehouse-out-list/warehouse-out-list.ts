import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'; // 👈 ¡ESTO ES CRUCIAL!

interface Product {
  id: string;
  name: string;
  category: 'Herramientas' | 'Construcción' | 'Electricidad' | 'Pinturas';
}
interface WarehouseOut {
  id: number;
  date: string;
  product: Product;
  quantity: number;
  destination: 'Venta Local' | 'Proyecto X' | 'Transferencia a Sucursal' | 'Venta Online';
  responsible: string;
  status: 'Completado' | 'En Tránsito' | 'Pendiente';
  notes?: string;
}
@Component({
  selector: 'app-warehouse-out-list',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterModule],
  providers: [DatePipe],
  templateUrl: './warehouse-out-list.html',
  styleUrl: './warehouse-out-list.css'
})
export class WarehouseOutList {
// --- VARIABLES DE ESTADO DE LA UI ---
  isModalOpen = false;
  selectedDispatch: WarehouseOut | null = null;
  activeTab: 'all' | 'transit' | 'completed' = 'all';

  // --- DATOS FICTICIOS (MOCK DATA) ---
  dispatches: WarehouseOut[] = [
    { id: 101, date: '2025-10-15T09:30:00', product: { id: 'HER-001', name: 'Martillo de Goma', category: 'Herramientas' }, quantity: 10, destination: 'Venta Local', responsible: 'Juan Pérez', status: 'Completado', notes: 'Venta directa en mostrador.' },
    { id: 102, date: '2025-10-15T11:00:00', product: { id: 'CON-015', name: 'Bolsa de Cemento Sol', category: 'Construcción' }, quantity: 50, destination: 'Proyecto X', responsible: 'Carlos Solano', status: 'En Tránsito', notes: 'Entrega para construcción del cliente "Edifica SAC".' },
    { id: 103, date: '2025-10-14T15:45:00', product: { id: 'ELE-005', name: 'Caja de Cable Indeco #12', category: 'Electricidad' }, quantity: 5, destination: 'Transferencia a Sucursal', responsible: 'Ana Torres', status: 'Completado' },
    { id: 104, date: '2025-10-14T10:20:00', product: { id: 'PIN-002', name: 'Galón de Pintura Látex', category: 'Pinturas' }, quantity: 15, destination: 'Venta Online', responsible: 'Sistema E-commerce', status: 'Completado', notes: 'Pedido #WEB-5821' },
    { id: 105, date: '2025-10-13T16:00:00', product: { id: 'HER-020', name: 'Juego de Taladro Inalámbrico', category: 'Herramientas' }, quantity: 3, destination: 'Venta Local', responsible: 'Juan Pérez', status: 'Completado' },
    { id: 106, date: '2025-10-12T08:00:00', product: { id: 'CON-008', name: 'Plancha de Drywall', category: 'Construcción' }, quantity: 20, destination: 'Proyecto X', responsible: 'Carlos Solano', status: 'Pendiente', notes: 'Programado para recojo por el cliente.' },
    { id: 107, date: '2025-10-11T14:30:00', product: { id: 'ELE-010', name: 'Rollo de Cinta Aislante 3M', category: 'Electricidad' }, quantity: 100, destination: 'Venta Local', responsible: 'María Luisa', status: 'Completado' },
  ];

  // --- MÉTODOS Y GETTERS ---

  // Filtra los despachos según la pestaña activa
  get filteredDispatches(): WarehouseOut[] {
    switch (this.activeTab) {
      case 'transit':
        return this.dispatches.filter(d => d.status === 'En Tránsito' || d.status === 'Pendiente');
      case 'completed':
        return this.dispatches.filter(d => d.status === 'Completado');
      default:
        return this.dispatches;
    }
  }

  get totalDispatchesToday(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.dispatches.filter(d => d.date.startsWith(today)).length;
  }
  
  get itemsDispatchedToday(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.dispatches
      .filter(d => d.date.startsWith(today))
      .reduce((sum, d) => sum + d.quantity, 0);
  }

  get pendingOrTransitCount(): number {
      return this.dispatches.filter(d => d.status === 'En Tránsito' || d.status === 'Pendiente').length;
  }

  // Cambia la pestaña activa
  setActiveTab(tab: 'all' | 'transit' | 'completed'): void {
    this.activeTab = tab;
  }

  // Abre el modal con los detalles de un despacho
  openModal(dispatch: WarehouseOut): void {
    this.selectedDispatch = dispatch;
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
    // Pequeño delay para que la animación de salida termine antes de limpiar los datos
    setTimeout(() => (this.selectedDispatch = null), 300);
  }

  // Asigna un color al estado del despacho para el badge
  getStatusColor(status: 'Completado' | 'En Tránsito' | 'Pendiente'): string {
    switch (status) {
      case 'Completado':
        return 'bg-accent-green/20 text-accent-green dark:bg-dark-green/30 dark:text-dark-green';
      case 'En Tránsito':
        return 'bg-secondary/40 text-text-dark dark:text-secondary';
      case 'Pendiente':
        return 'bg-accent-red/20 text-accent-red dark:bg-dark-red/30 dark:text-dark-red';
    }
  }
}
