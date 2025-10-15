import { Routes } from '@angular/router';

// Importamos los componentes standalone
import { ProviderList } from './components/provider-list/provider-list';
import { ProviderForm } from './components/provider-form/provider-form';

// Exportamos el arreglo de rutas
export const PROVIDERS_ROUTES: Routes = [
  {
    path: '', // Ruta por defecto (/dashboard/providers)
    component: ProviderList
  },
  {
    path: 'new', // Ruta para añadir un nuevo proveedor (/dashboard/providers/new)
    component: ProviderForm
  },
  {
    path: 'edit/:id', // Ruta para editar un proveedor existente (/dashboard/providers/edit/1)
    component: ProviderForm
  }
];