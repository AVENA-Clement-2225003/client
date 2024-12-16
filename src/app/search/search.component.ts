import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div>
      <h2>Search</h2>
      <form (ngSubmit)="onSearch()">
        <div>
          <label for="searchTerm">Search:</label>
          <input type="text" [(ngModel)]="searchTerm" name="searchTerm" required placeholder="Enter a keyword">
        </div>
        <div>
          <label for="searchType">Type:</label>
          <select [(ngModel)]="searchType" name="searchType" required>
            <option value="company">Company</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      <div *ngIf="results?.length">
        <h3>Results:</h3>
        <ul>
          <li *ngFor="let result of results">{{ result.name }} - {{ result.industry || result.position }}</li>
        </ul>
      </div>

      <div *ngIf="!results?.length && searched">
        <p>No results found for your search.</p>
      </div>
    </div>
  `,
})
export class SearchComponent {
  searchTerm: string = '';
  searchType: string = '';
  searched: boolean = false;
  results: any[] = [];
  searchOptions: string[] = ['company', 'employee'];

  constructor(private httpClient: HttpClient) {}

  onSearch() {
    this.searched = true;
    this.performSearch(this.searchTerm, this.searchType).subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.error('Error fetching search results:', error);
        this.results = []; // or handle it in a way that fits your use case
      }
    );
  }

  performSearch(term: string, type: string): Observable<any[]> {
    const url = `http://localhost:5200/search?keyword=${term}&type=${type}`;
    return this.httpClient.get<any[]>(url).pipe(
      map(response => {
        // Assuming the API returns the data directly, otherwise map the necessary properties
        return response;
      }),
      catchError(err => {
        console.error('Search error:', err);
        return of([]);  // Return an observable of empty array in case of error
      })
    );
  }
}
