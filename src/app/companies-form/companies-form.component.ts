import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Company } from '../company';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .company-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="company-form"
      autocomplete="off"
      [formGroup]="companyForm"
      (submit)="submitForm()"
    >
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput placeholder="Name" formControlName="name" required />
        @if (name.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>
      
      <mat-form-field>
        <mat-label>Industry</mat-label>
        <input
          matInput
          placeholder="Industry"
          formControlName="industry"
          required
        />
        @if (position.invalid) {
        <mat-error>Position must be at least 5 characters long.</mat-error>
        }
      </mat-form-field>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="companyForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})
export class CompanyFormComponent {
  position: any;
  initialState = input<Company>();

  @Output()
  formValuesChanged = new EventEmitter<Company>();

  @Output()
  formSubmitted = new EventEmitter<Company>();

  companyForm;

  constructor(private formBuilder: FormBuilder) {
    // Move the initialization of the form here
    this.companyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      industry: ['', [Validators.required, Validators.minLength(5)]],
    });

    effect(() => {
      this.companyForm.setValue({
        name: this.initialState()?.name || '',
        industry: this.initialState()?.industry || '',
      });
    });
  }

  get name() {
    return this.companyForm.get('name')!;
  }
  get industry() {
    return this.companyForm.get('industry')!;
  }

  submitForm() {
    this.formSubmitted.emit(this.companyForm.value as Company);
  }
}
