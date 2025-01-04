import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskStatus} from '../../models/task-status.enum';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  standalone:false,
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  errorMessage: string = '';
  selectedTask: Task | null = null;
  searchKeyword: string = '';  // For search
  filterStatus: TaskStatus | undefined = undefined;   // For filter

  constructor(private taskService: TaskService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (data: Task[]) => this.tasks = data,
      error: err => this.errorMessage = 'Failed to load tasks. Please try again later.'
    });
  }

  deleteTask(taskId: number | undefined): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
          console.log(`Task with ID ${taskId} deleted successfully.`);
        },
        error: () => {
          this.errorMessage = 'Failed to delete the task. Please try again later.';
        },
      });
    }
  }

  editTask(taskId: number | undefined, content: any): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (task) => {
        this.selectedTask = task;
        this.modalService.open(content, {size: 'lg'});
      },
      error: () => {
        this.errorMessage = 'Failed to load the task. Please try again later.';
      }
    });
  }

  onTaskSaved(modal: any): void {
    this.loadTasks();
    modal.dismiss();
  }

  filterTasks(): void {
    if (this.filterStatus) {
      this.taskService.filterTasks(this.filterStatus).subscribe({
        next: (data) => this.tasks = data,
        error: () => this.errorMessage = 'Failed to filter tasks. Please try again later.'
      });
    } else {
      this.loadTasks();
    }
  }

  searchTasks(): void {
    if (this.searchKeyword.trim()) {
      this.taskService.searchTasks(this.searchKeyword).subscribe({
        next: (data) => this.tasks = data,
        error: () => this.errorMessage = 'Failed to search tasks. Please try again later.'
      });
    } else {
      this.loadTasks();
    }
  }
}
