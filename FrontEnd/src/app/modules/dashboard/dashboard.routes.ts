import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home/home';
import { Reports } from './pages/reports/reports';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'reports', component: Reports },
      {
        path: 'employees',

        loadChildren: () => import('../employees/employees.routes').then(r => r.EMPLOYEES_ROUTES)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.routes').then(r => r.PRODUCTS_ROUTES)
      }, 
      {
        path: 'providers',
        loadChildren: () => import('../providers/providers.routes').then(r => r.PROVIDERS_ROUTES)
      },
      {
        path: 'warehouse-out',
        loadChildren: () => import('../warehouse-out/warehouse-out.routes').then(r => r.WAREHOUSE_OUT_ROUTES)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];