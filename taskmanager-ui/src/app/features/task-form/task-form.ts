import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../task-list/task-type';
import { TaskService } from '../task-list/task-api';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from "@angular/material/card";
import { TaskStoreService } from '../task-list/task-store';
import { SubscriptionAdapter } from '../../shared/subscription-adapter';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm extends SubscriptionAdapter implements OnInit {

  private formBuilder = inject(FormBuilder);
  taskForm: FormGroup = this.initForm();
  
  constructor(private taskService: TaskService,
    private taskStoreService: TaskStoreService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subs.add(
      this.taskStoreService.getRowClick()
        .subscribe((task) => {
          this.taskForm.patchValue(task);
        })
    )
  }

  initForm(): FormGroup {
    return this.formBuilder.group<Task>(this.defaultValue);
  }

  resetForm() {
    this.taskForm.reset(this.defaultValue, { emitEvent: false });
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

  get task(): Task {
    return this.taskForm.value
  }

  get defaultValue(): Task {
    return {
      id: 0,
      title: '',
      description: '',
      isCompleted: false
    }
  }
}
