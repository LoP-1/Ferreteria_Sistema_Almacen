import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirige a la página de autenticación por defecto
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  // Carga el módulo de autenticación (corregí una pequeña cosa aquí)
  {
    path: 'auth',
    // Es mejor cargar el MÓDULO, no solo el archivo de enrutamiento
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    // Asegúrate de que esta línea cargue el ARCHIVO .routes.ts
    // y apunte a la constante exportada (DASHBOARD_ROUTES).
    loadChildren: () => import('./modules/dashboard/dashboard.routes').then(r => r.DASHBOARD_ROUTES)
  }
];