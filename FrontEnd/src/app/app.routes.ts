import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';
import { WorkerLayoutComponent } from './shared/layouts/worker-layout/worker-layout.component';

export const routes: Routes = [
  // Ruta para la página de inicio de sesión
  { path: 'login', component: LoginComponent },
  
  // --- SECCIÓN DEL ADMINISTRADOR ---
  {
    path: 'admin',
    component: AdminLayoutComponent, // Carga primero el layout/plantilla del admin
    canActivate: [authGuard],        // Usa el guard para proteger esta sección
    data: { role: 'Administrador' }, // Le dice al guard que solo permite administradores
    // Carga de forma "perezosa" las rutas hijas del administrador
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  
  // --- SECCIÓN DEL TRABAJADOR ---
  {
    path: 'worker',
    component: WorkerLayoutComponent, // Carga primero el layout/plantilla del worker
    canActivate: [authGuard],         // También protege esta sección
    data: { role: 'Trabajador' },   // Solo permite trabajadores
    // Carga de forma "perezosa" las rutas hijas del trabajador
    loadChildren: () => import('./features/worker/worker.routes').then(m => m.WORKER_ROUTES)
  },

  // --- REDIRECCIONES ---
  // Si el usuario entra a la raíz, lo envía a /login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Si el usuario escribe una URL que no existe, lo envía a /login
  { path: '**', redirectTo: '/login' }
];