import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaProductosComponent } from '../inventario/lista-productos/lista-productos.component';
import { ListaPersonalComponent } from '../personal/lista-personal/lista-personal.component';
import { ListaProveedoresComponent } from '../proveedores/lista-proveedores/lista-proveedores.component';
import { HistorialMovimientosComponent } from '../movimientos/historial-movimientos/historial-movimientos.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventario', component: ListaProductosComponent },
  { path: 'personal', component: ListaPersonalComponent },
  { path: 'proveedores', component: ListaProveedoresComponent },
  { path: 'movimientos', component: HistorialMovimientosComponent },
];