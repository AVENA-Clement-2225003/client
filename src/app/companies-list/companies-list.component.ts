import { Component, OnInit, WritableSignal } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
  styles: [
    `
      table {
        width: 100%;

        button:first-of-type {
          margin-right: 1rem;
        }
      }
    `,
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Companies List</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="companies$()">
          <ng-container matColumnDef="col-name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="col-industry">
            <th mat-header-cell *matHeaderCellDef>Industry</th>
            <td mat-cell *matCellDef="let element">{{ element.industry }}</td>
          </ng-container>
          <ng-container matColumnDef="col-action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
            <td mat-cell *matCellDef="let element">
              <button mat-raised-button [routerLink]="['edit/', element._id]">
                Edit
              </button>
              <button
                mat-raised-button
                color="warn"
                (click)="deleteCompany(element._id || '')"
              >
                Delete
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['new']">
          Add a New Company
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class CompaniesListComponent implements OnInit {
  companies$ = {} as WritableSignal<Company[]>;
  displayedColumns: string[] = [
    'col-name',
    'col-industry',
    'col-action',
  ];

  constructor(private companiesService: CompanyService) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  deleteCompany(id: string): void {
    this.companiesService.deleteCompany(id).subscribe({
      next: () => this.fetchCompanies(),
    });
  }

  private fetchCompanies(): void {
    this.companies$ = this.companiesService.companies$;
    this.companiesService.getCompanies();
  }
}