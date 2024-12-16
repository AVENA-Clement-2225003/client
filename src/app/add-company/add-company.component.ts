import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyFormComponent } from '../companies-form/companies-form.component';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [CompanyFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add a New Company</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-company-form
          (formSubmitted)="addCompany($event)"
        ></app-company-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class AddCompanyComponent {
  constructor(
    private router: Router,
    private companyService: CompanyService
  ) {}

  addCompany(company: Company) {
    this.companyService.createCompany(company).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Failed to create company');
        console.error(error);
      },
    });
    this.companyService.getCompanies();
  }
}