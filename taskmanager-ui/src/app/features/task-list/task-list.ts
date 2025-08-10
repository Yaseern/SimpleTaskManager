import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TaskService } from './task-api';
import { Task } from './task-type';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TaskStoreService } from './task-store';
import { SubscriptionAdapter } from '../../shared/subscription-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule, MatTableModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSortModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList extends SubscriptionAdapter implements AfterViewInit {
  tasks = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['isCompleted', 'title', 'description', 'action'];

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private taskService: TaskService,
    private taskStoreService: TaskStoreService
  ) {
    super();
  }

  ngOnInit() {
    this.loadTasks();

    this.subs.add(this.taskStoreService.refreshTable()
      .subscribe(() => this.bindDataSource()))
  }

  ngAfterViewInit() {
    this.tasks.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tasks.filter = filterValue.trim().toLowerCase();
  }

  loadTasks() {
    this.subs.add(
      this.taskService.getTasks().subscribe(() => this.bindDataSource())
    );
  }

  updateTask(task: Task) {
    this.subs.add(this.taskService.updateTask(task).subscribe());
  }

  deleteTask(id: number) {
    this.subs.add(
      this.taskService.deleteTask(id).subscribe(() => this.bindDataSource())
    );
  }

  onRowClick(data: Task): void {
    this.taskStoreService.publishRowClick(data);
  }

  bindDataSource(): void {
    this.tasks.data = this.taskStoreService.taskStore();
  }
}
