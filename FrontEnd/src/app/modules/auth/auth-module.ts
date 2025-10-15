// src/app/modules/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // <-- ¡Importar aquí!

import { AuthRoutingModule } from './auth-routing-module';
import { Login } from './components/login/login'; // ¡Asegúrate de que sea .component!
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    Login,
    ReactiveFormsModule // <-- Y agregarlo a los imports
  ]
})
export class AuthModule { }