import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task-list/task-type';
import { TaskService } from '../task-list/task-api';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { TaskStoreService } from '../task-list/task-store';
import { SubscriptionAdapter } from '../../shared/subscription-adapter';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm extends SubscriptionAdapter implements OnInit {
  task: Task = this.initialize();

  @ViewChild("taskForm") taskForm?: NgForm = undefined;

  constructor(private taskService: TaskService,
    private taskStoreService: TaskStoreService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(
      this.taskStoreService.getRowClick()
        .subscribe((task) => {
          this.task = task;
        })
    )
  }

  initialize(): Task {
    return { id: 0, title: '', description: '', isCompleted: false };
  }

  resetForm() {   
    this.task = this.initialize();
     this.taskForm?.resetForm();
  }

  saveTask() {
    if (this.task.id ?? 0 > 0) {
      this.updateTask();
    } else {
      this.subs.add(
        this.taskService.addTask(this.task).subscribe(() => {
          this.resetFormAfterSave();
        })
      );
    }
  }

  private updateTask() {
    this.subs.add(this.taskService.updateTask({ ...this.task }).subscribe(() => {
      this.resetFormAfterSave();
    }));
  }

  private resetFormAfterSave() {
    this.resetForm();
    this.taskStoreService.triggerRefresh();
  }
}
