import { Component, OnInit, ChangeDetectorRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee as EmployeeService, Empleado as BackendEmployee } from '../../services/employee';

interface Employee {
  id: number;
  name: string;
  avatar: string;
  position: string;
  email: string;
  status: 'Activo' | 'Inactivo' | 'En Pausa';
  performance: number; // Un valor de 0 a 100 para la métrica de rendimiento
  joinDate: string;
}
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  private employeeService = inject(EmployeeService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  // --- Estado de la UI ---
  isModalOpen = false;
  selectedEmployee: Employee | null = null;
  activeTab: 'all' | 'active' | 'inactive' = 'all';
  searchTerm: string = '';

  employees: Employee[] = [];

  ngOnInit(): void {
   if (isPlatformBrowser(this.platformId)) {
      this.loadEmployees();
    }
  }
  loadEmployees(): void {
    this.employeeService.getAllUsuarios().subscribe({
      next: (backendData: BackendEmployee[]) => {
        // --- PASO DE DEPURACIÓN 1: VERIFICAR LOS DATOS CRUDOS ---
        console.log('Datos CRUDOS recibidos del backend:', backendData);

        if (!Array.isArray(backendData)) {
          console.error('La respuesta del backend no es un array. Se recibió:', backendData);
          return; // Detenemos la ejecución si no es un array
        }

        const transformedEmployees: Employee[] = [];

        for (const be of backendData) {

          try {
            if (be) {
              transformedEmployees.push(this.transformBackendEmployee(be));
            } else {
              console.warn('Se encontró un elemento nulo o undefined en los datos del backend.');
            }
          } catch (e) {
            console.error('Error al transformar un empleado:', be, 'Error:', e);

          }
        }

        this.employees = transformedEmployees;
        console.log('Empleados cargados y transformados:', this.employees);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la petición HTTP al cargar los empleados:', err);
      }
    });
  }
  private transformBackendEmployee(backendEmp: BackendEmployee): Employee {
    // Verificación adicional para asegurar que las propiedades existen
    if (!backendEmp.idEmpleado || !backendEmp.nombres || !backendEmp.apellidos) {
      throw new Error('El objeto Empleado del backend no tiene las propiedades esperadas.');
    }

    return {
      id: backendEmp.idEmpleado,
      name: `${backendEmp.nombres} ${backendEmp.apellidos}`,
      email: backendEmp.email,
      avatar: `https://i.pravatar.cc/150?u=${backendEmp.idEmpleado}`,
      position: 'Colaborador',
      status: 'Activo',
      performance: Math.floor(Math.random() * (98 - 70 + 1)) + 70,
      joinDate: '2024-01-01'
    };
  }
  // --- Métodos para controlar la UI ---
  openModal(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    // Retraso para la animación de salida
    setTimeout(() => this.selectedEmployee = null, 300);
  }

  setActiveTab(tab: 'all' | 'active' | 'inactive'): void {
    this.activeTab = tab;
  }
  get filteredEmployees(): Employee[] {
    // Primero, filtramos por la pestaña activa (Todos, Activos, Inactivos)
    let employeesByTab = this.employees;
    if (this.activeTab !== 'all') {
      const status = this.activeTab === 'active' ? 'Activo' : 'Inactivo';
      employeesByTab = this.employees.filter(emp => emp.status === status || (this.activeTab === 'inactive' && emp.status === 'En Pausa'));
    }

    // Si no hay término de búsqueda, devolvemos la lista filtrada por pestaña
    if (!this.searchTerm.trim()) {
      return employeesByTab;
    }

    // Si hay un término de búsqueda, aplicamos el segundo filtro
    const lowercasedTerm = this.searchTerm.toLowerCase();
    return employeesByTab.filter(emp =>
      emp.name.toLowerCase().includes(lowercasedTerm) ||
      emp.email.toLowerCase().includes(lowercasedTerm)
    );
  }
  // --- Métodos para calcular métricas ---
  get totalEmployees(): number {
    return this.employees.length;
  }

  get activeEmployees(): number {
    return this.employees.filter(e => e.status === 'Activo').length;
  }

  get averagePerformance(): number {
    if (this.employees.length === 0) return 0;
    const total = this.employees.reduce((acc, curr) => acc + curr.performance, 0);
    return Math.round(total / this.employees.length);
  }
}
