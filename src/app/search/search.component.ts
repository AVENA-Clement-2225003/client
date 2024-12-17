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
      <form (ngSubmit)="onSearch()" class="searchForm">
        <div class="searchBar">
          <input class="searchInput" type="text" [(ngModel)]="searchTerm" name="searchTerm" required placeholder="Enter a word">
          <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg></button>
        </div>
        <select [(ngModel)]="searchType" name="searchType" required>
          <option value="company" selected>Company</option>
          <option value="employee">Employee</option>
        </select>
        <select [(ngModel)]="searchMode" name="searchMode" required>
          <option value="asc" selected>Asc</option>
          <option value="desc">Desc</option>
        </select>
      </form>

      <div *ngIf="results?.length">
        <h3>Results:</h3>
        <div class=resultDisplayer>
          <div class="result" *ngFor="let result of results">
            <svg *ngIf="!result?.level" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-buildings" viewBox="0 0 16 16">
              <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z"/>
              <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z"/>
            </svg>
            <svg *ngIf="result?.level" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
            <div class="resultInfo">
              <p>{{ result.name }}</p>
              <p>{{ result.industry || result.position }}</p>
              <p *ngIf="result?.level">
                {{ result.level }}
              </p>
            <div>
          </div>
        </div>
      </div>

      <div *ngIf="!results?.length && searched">
        <p>No results found for your search.</p>
      </div>
    </div>
  `,
})
export class SearchComponent {
  searchTerm: string = '';
  searchType: string = 'company';
  searchMode: string = 'asc';
  searched: boolean = false;
  results: any[] = [];
  searchOptions: string[] = ['company', 'employee'];

  constructor(private httpClient: HttpClient) {}

  onSearch() {
    this.searched = true;
    this.performSearch(this.searchTerm, this.searchType, this.searchMode).subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.error('Error fetching search results:', error);
        this.results = []; // or handle it in a way that fits your use case
      }
    );
  }

  performSearch(term: string, type: string, mode: string): Observable<any[]> {
    const url = `http://localhost:5200/search?keyword=${term}&type=${type}&mode=${mode}`;
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
