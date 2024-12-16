import { Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';

export const routes: Routes = [
  {
    path: 'employees',
    children: [
      { path: '', component: EmployeesListComponent, title: 'Employees List' },
      { path: 'new', component: AddEmployeeComponent, title: 'Add New Employee' },
      { path: 'edit/:id', component: EditEmployeeComponent, title: 'Edit Employee' },
    ],
  },
  {
    path: 'companies',
    children: [
      { path: '', component: CompaniesListComponent, title: 'Companies List' },
      { path: 'new', component: AddCompanyComponent, title: 'Add New Company' },
      { path: 'edit/:id', component: EditCompanyComponent, title: 'Edit Company' },
    ],
  },
];