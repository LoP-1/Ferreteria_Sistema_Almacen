import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Datos de ejemplo para mostrar en las tarjetas
  totalProductos: number = 1250;
  productosStockBajo: number = 32;
  totalProveedores: number = 15;
  salidasHoy: number = 78;
}