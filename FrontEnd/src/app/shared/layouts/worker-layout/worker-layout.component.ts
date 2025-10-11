import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// Ruta corregida:
import { WorkerSidebarComponent } from '../../components/worker-sidebar/worker-sidebar.component';

@Component({
  selector: 'app-worker-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WorkerSidebarComponent],
  templateUrl: './worker-layout.component.html',
  styleUrls: ['./worker-layout.component.scss']
})
export class WorkerLayoutComponent {

}