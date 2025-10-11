import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
// Ruta corregida:
import { appConfig } from './app/app.config';
// Ruta corregida:
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));