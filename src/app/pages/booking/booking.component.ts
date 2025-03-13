import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
    CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  providers: [ApiService]
})
export class BookingComponent {

  bookingForm: FormGroup;
  bookings: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.bookingForm = this.fb.group({
      userId: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
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
