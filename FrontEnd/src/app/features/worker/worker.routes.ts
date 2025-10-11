import { Routes } from '@angular/router';
import { OperacionesComponent } from './operaciones/operaciones.component';

// Mapa de rutas para la sección de Trabajador
export const WORKER_ROUTES: Routes = [
  { path: '', redirectTo: 'operaciones', pathMatch: 'full' },
  { path: 'operaciones', component: OperacionesComponent },
  // Aquí añadirás más rutas de worker en el futuro
];