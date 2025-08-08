import { Component } from '@angular/core';
import { TaskService } from './task-api';
import { Task } from './task-type';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-list',
    imports: [CommonModule, FormsModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
 tasks: Task[] = [];
 displayedColumns: string[] = ['isCompleted', 'title', 'description', 'action'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  onRowClick(data: Task): void {

  }
}
