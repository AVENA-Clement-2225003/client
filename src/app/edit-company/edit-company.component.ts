import { Component, OnInit, WritableSignal } from '@angular/core';
import { CompanyFormComponent } from '../companies-form/companies-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-company',
  standalone: true,
  imports: [CompanyFormComponent, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Edit an Company</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <app-company-form
          [initialState]="company()"
          (formSubmitted)="editCompany($event)"
        ></app-company-form>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class EditCompanyComponent implements OnInit {
  company = {} as WritableSignal<Company>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.companyService.getCompany(id!);
    this.company = this.companyService.company$;
  }

  editCompany(company: Company) {
    this.companyService
      .updateCompany(this.company()._id || '', company)
      .subscribe({
        next: () => {
          this.router.navigate(['/companies']);
        },
        error: (error) => {
          alert('Failed to update company');
          console.error(error);
        },
      });
  }
}