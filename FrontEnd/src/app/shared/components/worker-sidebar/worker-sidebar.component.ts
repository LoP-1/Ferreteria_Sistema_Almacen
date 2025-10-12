import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-worker-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './worker-sidebar.component.html',
  styleUrls: ['./worker-sidebar.component.scss']
})
export class WorkerSidebarComponent {
  private authService = inject(AuthService);

  navLinks = [
    { label: 'Inicio', routerLink: '/worker/operaciones', exact: true },
    { label: 'Registrar movimiento', routerLink: '/worker/registro-movimiento', exact: true },
    { label: 'Ver inventario', routerLink: '/worker/inventario', exact: true }
  ];

  logout(): void {
    this.authService.logout();
  }
}