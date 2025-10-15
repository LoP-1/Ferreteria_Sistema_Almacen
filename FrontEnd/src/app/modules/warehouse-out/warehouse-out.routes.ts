import { Routes } from '@angular/router';

// Importamos los componentes standalone
import { WarehouseOutList } from './components/warehouse-out-list/warehouse-out-list';
import { WarehouseOutForm } from './components/warehouse-out-form/warehouse-out-form';

// Exportamos el arreglo de rutas
export const WAREHOUSE_OUT_ROUTES: Routes = [
  {
    path: '', // Ruta por defecto (/dashboard/warehouse-out)
    component: WarehouseOutList
  },
  {
    path: 'new', // Ruta para registrar una nueva salida (/dashboard/warehouse-out/new)
    component: WarehouseOutForm
  // Podrías añadir una ruta 'view/:id' si necesitas ver el detalle de una salida
  }
];