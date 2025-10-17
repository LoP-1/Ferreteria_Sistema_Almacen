import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Interfaz para definir la estructura de un proveedor
interface Provider {
  id: number;
  name: string;
  logo: string; // URL al logo del proveedor
  contactPerson: string;
  email: string;
  phone: string;
  category: 'Construcción' | 'Herramientas' | 'Pinturas' | 'Electricidad' | 'Acabados';
  status: 'Activo' | 'En Pausa' | 'Inactivo';
  reliability: number; // Puntuación de fiabilidad de 0 a 100
  memberSince: string;
  isActionMenuOpen?: boolean; // Para controlar el dropdown
}
@Component({
  selector: 'app-provider-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css'
})
export class ProviderList {
  // --- VARIABLES DE ESTADO DE LA UI ---
  activeTab: 'all' | 'active' | 'paused' = 'all';
  isModalOpen = false;
  selectedProvider: Provider | null = null;

  // --- DATOS FICTICIOS (MOCK DATA) ---
  providers: Provider[] = [
    { id: 1, name: 'Aceros Arequipa', logo: 'https://i.pravatar.cc/150?u=aceros', contactPerson: 'Carlos Rivera', email: 'c.rivera@aceroscorp.com', phone: '987 654 321', category: 'Construcción', status: 'Activo', reliability: 95, memberSince: '2020-05-15' },
    { id: 2, name: 'Cementos Pacasmayo', logo: 'https://i.pravatar.cc/150?u=pacasmayo', contactPerson: 'Lucía Mendoza', email: 'lucia.m@pacasmayo.com.pe', phone: '912 345 678', category: 'Construcción', status: 'Activo', reliability: 92, memberSince: '2019-11-20' },
    { id: 3, name: 'Ferretería El Tornillo S.A.C.', logo: 'https://i.pravatar.cc/150?u=tornillo', contactPerson: 'Jorge Vargas', email: 'j.vargas@eltornillo.com', phone: '998 877 665', category: 'Herramientas', status: 'En Pausa', reliability: 75, memberSince: '2021-02-10' },
    { id: 4, name: 'Pinturas CPP', logo: 'https://i.pravatar.cc/150?u=cpp', contactPerson: 'Ana Morales', email: 'amorales@cpp.com.pe', phone: '955 443 322', category: 'Pinturas', status: 'Activo', reliability: 88, memberSince: '2018-08-01' },
    { id: 5, name: 'Indeco', logo: 'https://i.pravatar.cc/150?u=indeco', contactPerson: 'Ricardo Soto', email: 'rsoto@indeco.com', phone: '944 556 677', category: 'Electricidad', status: 'Activo', reliability: 98, memberSince: '2017-03-25' },
    { id: 6, name: 'Celima', logo: 'https://i.pravatar.cc/150?u=celima', contactPerson: 'Sofia Castillo', email: 'scastillo@celima.com', phone: '933 221 100', category: 'Acabados', status: 'Inactivo', reliability: 65, memberSince: '2022-01-30' },
    { id: 7, name: 'Bosch Herramientas', logo: 'https://i.pravatar.cc/150?u=bosch', contactPerson: 'Martin Bauer', email: 'martin.b@bosch.com', phone: '921 234 567', category: 'Herramientas', status: 'Activo', reliability: 99, memberSince: '2021-06-12' },
    { id: 8, name: 'Pavco', logo: 'https://i.pravatar.cc/150?u=pavco', contactPerson: 'Daniela Flores', email: 'daniela.f@pavco.com.pe', phone: '987 123 456', category: 'Construcción', status: 'En Pausa', reliability: 81, memberSince: '2023-09-05' },
  ];

  // --- MÉTODOS Y GETTERS PARA LA LÓGICA DE LA VISTA ---

  get totalProviders() {
    return this.providers.length;
  }
  get activeProviders() {
    return this.providers.filter(p => p.status === 'Activo').length;
  }
  get averageReliability() {
    if (this.providers.length === 0) return 0;
    const total = this.providers.reduce((acc, p) => acc + p.reliability, 0);
    return Math.round(total / this.providers.length);
  }
  
  // Filtra los proveedores según la pestaña activa
  get filteredProviders(): Provider[] {
    if (this.activeTab === 'active') {
      return this.providers.filter(p => p.status === 'Activo');
    }
    if (this.activeTab === 'paused') {
      return this.providers.filter(p => p.status === 'En Pausa' || p.status === 'Inactivo');
    }
    return this.providers;
  }

  // Cambia la pestaña activa
  setActiveTab(tab: 'all' | 'active' | 'paused'): void {
    this.activeTab = tab;
  }

  // Controla la apertura/cierre del menú de acciones
  toggleActionMenu(providerId: number): void {
    this.providers = this.providers.map(p => {
      p.isActionMenuOpen = p.id === providerId ? !p.isActionMenuOpen : false;
      return p;
    });
  }

  // Abre el modal con la información de un proveedor
  openModal(provider: Provider): void {
    this.selectedProvider = provider;
    this.isModalOpen = true;
  }

  // Cierra el modal
  closeModal(): void {
    this.isModalOpen = false;
    // Pequeño delay para que la animación de salida termine antes de limpiar los datos
    setTimeout(() => this.selectedProvider = null, 300);
  }

  // Devuelve clases de color para el badge de estado
  getStatusColor(status: 'Activo' | 'En Pausa' | 'Inactivo'): string {
    switch (status) {
      case 'Activo': return 'bg-accent-green/20 text-accent-green dark:bg-dark-green/30 dark:text-dark-green';
      case 'En Pausa': return 'bg-secondary/40 text-text-dark dark:text-secondary';
      case 'Inactivo': return 'bg-accent-red/20 text-accent-red dark:bg-dark-red/30 dark:text-dark-red';
    }
  }

  // Devuelve clases de color para la barra de fiabilidad
  getReliabilityColor(reliability: number): string {
    if (reliability < 70) return 'bg-accent-red dark:bg-dark-red';
    if (reliability < 90) return 'bg-secondary';
    return 'bg-primary dark:bg-dark-primary';
  }
}
