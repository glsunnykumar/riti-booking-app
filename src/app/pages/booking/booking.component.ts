import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  standalone :true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatSnackBarModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {

  minDate: Date = new Date(); // Setting minimum date to today
  bookingForm: FormGroup;
  services = [
    { name: 'Haircut', price: 20 },
    { name: 'Spa Treatment', price: 50 },
    { name: 'Massage', price: 40 }
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  confirmBooking() {
    if (this.bookingForm.invalid) {
      this.snackBar.open('Please fill in all details correctly', 'OK', { duration: 2000, panelClass: ['error-snackbar'] });
      return;
    }

    console.log('Booking Confirmed:', this.bookingForm.value);
    this.snackBar.open('Booking confirmed successfully!', 'OK', { duration: 2000, panelClass: ['success-snackbar'] });

    this.bookingForm.reset();
  }
}



