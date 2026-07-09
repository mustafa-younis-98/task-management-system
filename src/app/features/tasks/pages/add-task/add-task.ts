import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task';
import { Task } from '../../../../core/models/task';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
})
export class AddTask {
  private readonly taskService = inject(TaskService);

  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);

  private readonly toastService = inject(ToastService);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    status: ['todo'],
    priority: ['medium'],
    category: [''],
    dueDate: [''],
  });

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> =
      this.taskForm.getRawValue() as Omit<
        Task,
        'id' | 'createdAt' | 'updatedAt'
      >;

    this.taskService.addTask(task).subscribe({
      next: () => {
        this.toastService.show('Task added successfully.', 'success');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.toastService.show('Failed to add task.', 'error');
      },
    });
  }
}
