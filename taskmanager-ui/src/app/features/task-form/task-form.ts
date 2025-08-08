import { Component } from '@angular/core';
import { Task } from '../task-list/task-type';
import { TaskService } from '../task-list/task-api';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-task-form',
 imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
task: Task = { title: '', description: '', isCompleted: false };

  constructor(private taskService: TaskService) {}

  addTask() {
    this.taskService.addTask(this.task).subscribe(() => {
      this.task = { title: '', description: '', isCompleted: false };
    });
  }
}
