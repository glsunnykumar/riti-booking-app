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
import { BookingService } from '../../services/booking/booking.service';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

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
  userId: string | null = null;

  services = [
    { name: 'Haircut', price: 20 },
    { name: 'Spa Treatment', price: 50 },
    { name: 'Massage', price: 40 }
  ];

  constructor(private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private bookingService: BookingService,
     private firestore: Firestore,
     private auth: Auth
    ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      service: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

     // Fetch logged-in user ID
     this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  get f() {
    return this.bookingForm.controls;
  }

  async submitBooking() {
    if (this.bookingForm.valid) {

      const bookingData = {
        ...this.bookingForm.value,
        userId: this.userId, // Store user ID
        status: 'pending', // Default status
        createdAt: new Date()
      };

      await this.bookingService.addBooking(bookingData);
      alert('Booking Confirmed!');
      this.bookingForm.reset();
    }
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

  async cancelBooking(bookingId: string) {
    // if (!this.userId) return;

    // const bookingRef = doc(this.firestore, 'bookings', bookingId);
    // const bookingSnap = await getDoc(bookingRef);

    // if (bookingSnap.exists() && bookingSnap.data().userId === this.userId) {
    //   await updateDoc(bookingRef, { status: 'cancelled' });
    //   alert('Booking cancelled successfully.');
    // } else {
    //   alert('You can only cancel your own booking.');
    // }
  }



}



