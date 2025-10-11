import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-worker-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './worker-sidebar.component.html',
  styleUrls: ['./worker-sidebar.component.scss']
})
export class WorkerSidebarComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}