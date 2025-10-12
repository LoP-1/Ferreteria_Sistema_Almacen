import { Routes } from '@angular/router';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { RegistrarMovimientoComponent } from './registrar-movimiento/registrar-movimiento.component';
import { ConsultarInventarioComponent } from './consultar-inventario/consultar-inventario.component';

// Mapa de rutas para la sección de Trabajador
export const WORKER_ROUTES: Routes = [
  { path: '', redirectTo: 'operaciones', pathMatch: 'full' },
  { path: 'operaciones', component: OperacionesComponent },
  { path: 'registro-movimiento', component: RegistrarMovimientoComponent },
  { path: 'inventario', component: ConsultarInventarioComponent },
  { path: '**', redirectTo: 'operaciones' }
];