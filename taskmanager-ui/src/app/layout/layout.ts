import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskForm } from '../features/task-form/task-form';
import { TaskList } from '../features/task-list/task-list';
import { clearSession } from '../shared/utils';

@Component({
  selector: 'app-layout',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, TaskForm, TaskList],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  logOut() {
    clearSession();
  }
}
