import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './components/login/login';


const routes: Routes = [
  {
    path: '', 
    redirectTo: 'login', // Redirige /auth a /auth/login
    pathMatch: 'full'
  },
  {
    path: 'login', // La ruta será /login
    component: Login
  },
  {
    path: '**', // Cualquier otra sub-ruta redirige a /login
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }