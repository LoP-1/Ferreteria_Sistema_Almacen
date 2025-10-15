import { Routes } from '@angular/router';

// Importa tus componentes standalone
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';

// Exporta el arreglo de rutas directamente
export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '', // Ruta -> /dashboard/employees
    component: EmployeeList
  },
  {
    path: 'new', // Ruta -> /dashboard/employees/new
    component: EmployeeForm
  },
  {
    path: 'edit/:id', // Ruta -> /dashboard/employees/edit/1
    component: EmployeeForm
  }
];