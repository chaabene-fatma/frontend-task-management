import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tasks: Task[] = [];
  error: string = '';

  constructor(private authService: AuthService, private router: Router,
              private taskService: TaskService, private modalService: NgbModal) {}
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data: Task[]) => this.tasks = data,
      error: err => this.error = 'Failed to load tasks. Please try again later.'
    });
  }

  onTaskCreate(modal: any): void {
    modal.dismiss();
    this.loadTasks();
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
