import { Component, effect, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, RouterOutlet
  ],
  templateUrl: './layout.html',
})
export class Layout {
  private document = inject(DOCUMENT);
  isDarkMode = signal(false);
  private platformId = inject(PLATFORM_ID);
  constructor(private router: Router) {
    // Inicialización: Cargar desde localStorage o preferir el sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Inicializar el estado
    if (savedTheme) {
      this.isDarkMode.set(savedTheme === 'dark');
    } else {
      this.isDarkMode.set(prefersDark);
    }

    // Efecto para aplicar la clase 'dark' al <html> y guardar la preferencia
    effect(() => {
      const isDark = this.isDarkMode();
      const htmlElement = this.document.documentElement;

      if (isDark) {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }, { allowSignalWrites: true }); 
  }

  isSidebarOpen = true;
  isUserDropdownOpen = false;

  navItems = [
    { path: 'home', name: 'Inicio', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5' },
    { path: 'products', name: 'Productos', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { path: 'reports', name: 'Reportes', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V5.25A2.25 2.25 0 0018 3H6A2.25 2.25 0 003.75 3zM12 7.5h.008v.008H12V7.5zm-3.75 0h.008v.008H8.25V7.5zm-3.75 0h.008v.008H4.5V7.5z' },
    { path: 'employees', name: 'Empleados', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 5.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' },
    { path: 'providers', name: 'Proveedores', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-1.025H9.625a2.056 2.056 0 00-1.58 1.025 17.903 17.903 0 00-3.213 9.193c-.04.62.469 1.124 1.09 1.124h1.125' },
    { path: 'warehouse-out', name: 'Salidas', icon: 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75' }
  ];
  // Inyección de DOCUMENT para manipular el DOM
  

  
  // --- MÉTODOS DE LA UI ---
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
  // 4. Método para alternar el modo oscuro
  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
  }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Limpiar datos de sesión solo en el navegador
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }

    
    this.router.navigate(['/auth']);

    console.log('Sesión cerrada y redirigiendo a /auth.');
  }
}