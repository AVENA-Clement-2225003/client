import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private url = 'http://localhost:5200';
  companies$ = signal<Company[]>([]);
  company$ = signal<Company>({} as Company);
 
  constructor(private httpClient: HttpClient) { }

  private refreshCompanies() {
    this.httpClient.get<Company[]>(`${this.url}/companies`)
      .subscribe(companies => {
        this.companies$.set(companies);
      });
  }

  getCompanies() {
    this.refreshCompanies();
    return this.companies$();
  }

  getCompany(id: string) {
    this.httpClient.get<Company>(`${this.url}/companies/${id}`).subscribe(company => {
      this.company$.set(company);
      return this.company$();
    });
  }

  createCompany(company: Company) {
    return this.httpClient.post(`${this.url}/companies`, company, { responseType: 'text' });
  }

  updateCompany(id: string, company: Company) {
    return this.httpClient.put(`${this.url}/companies/${id}`, company, { responseType: 'text' });
  }

  deleteCompany(id: string) {
    return this.httpClient.delete(`${this.url}/companies/${id}`, { responseType: 'text' });
  }
}