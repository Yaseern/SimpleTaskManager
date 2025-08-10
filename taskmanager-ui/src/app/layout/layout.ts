import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskForm } from '../features/task-form/task-form';
import { TaskList } from '../features/task-list/task-list';
import { clearSession } from '../shared/utils';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskStoreService } from '../features/task-list/task-store';
import { TaskService } from '../features/task-list/task-api';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, TaskForm, TaskList, MatTooltipModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  providers: [TaskService, TaskStoreService]
})
export class Layout {
  logOut() {
    clearSession();
    window.location.reload();
  }
}
