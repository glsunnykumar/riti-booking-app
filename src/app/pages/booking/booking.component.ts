import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-booking',
  standalone :true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatProgressSpinnerModule,
    CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ApiService]
})
export class BookingComponent {

  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private snackBar = inject(MatSnackBar);

  bookingForm: FormGroup;
  bookings:[] =[] ;
  isLoading = false;

  services = ['Haircut', 'Massage', 'Manicure', 'Dentist', 'Consultation'];

  constructor() {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      service: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  // 🔹 Submit Booking Form
  submitBooking() {
    if (this.bookingForm.valid) {
      this.apiService.createBooking(this.bookingForm.value).subscribe({
        next: (response) => {
          console.log('Booking Successful:', response);
          alert('Booking created successfully!');
          this.fetchBookings();
        },
        error: (error) => {
          console.error('Error creating booking:', error);
        }
      });
    }
  }
  

 // 🔹 Fetch All Bookings
fetchBookings() {
  this.apiService.getBookings().subscribe({
    next: (response) => {
      this.bookings = response;
    },
    error: (error) => {
      console.error('Error fetching bookings:', error);
    }
  });
}

  // Fetch bookings on component load
  ngOnInit() {
    this.fetchBookings();
  }

}
