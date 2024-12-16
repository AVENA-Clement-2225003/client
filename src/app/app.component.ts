import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EmployeesListComponent, MatToolbarModule],
  styles: [
    `
      main {
        display: flex;
        justify-content: center;
        padding: 2rem 4rem;
      }
    `,
  ],
  template: `
    <mat-toolbar>
      <span>Employees Management System</span>
      <nav>
      <ul>
        <li><a href="/companies">Companies</a></li>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/search">Search</a></li>
      </ul>
    </nav>
    </mat-toolbar>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'client';
}