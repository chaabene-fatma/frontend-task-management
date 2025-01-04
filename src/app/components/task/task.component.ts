import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {NgForm} from '@angular/forms';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Input() isEditMode: boolean = false;
  @Output() taskSaved = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return; // Prevent submission if form is invalid
    }
    if (this.isEditMode && this.task?.id) {
      // Edit existing task
      this.taskService.updateTask(this.task.id, form.value).subscribe(() => {
        this.taskSaved.emit();
      });
    } else {
      // Create a new task
      this.taskService.createTask(form.value).subscribe(() => {
        this.taskSaved.emit();
        form.reset();
      });
    }
  }
}
