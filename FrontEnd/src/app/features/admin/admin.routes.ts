import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Mapa de rutas para la sección de Administrador
export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // Aquí añadirás más rutas de admin en el futuro (ej. para inventario)
];