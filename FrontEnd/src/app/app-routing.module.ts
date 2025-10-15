// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // Cuando la URL esté vacía (inicio)
    redirectTo: 'auth', // Redirige a /auth
    pathMatch: 'full'
  },
  {
    path: 'auth', // Carga el módulo de autenticación
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  // Aquí irán las rutas del sistema una vez que el usuario inicie sesión
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }