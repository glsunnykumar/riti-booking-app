import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService } from '../../services/booking/booking.service';
import { Firestore ,collectionData,collection, query, where, getDocs } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ServiceService } from '../../services/service/service.service';
import { Observable, of } from 'rxjs';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-booking',
  standalone :true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatSnackBarModule,
    MatRadioModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {

  minDate: Date = new Date(); // Setting minimum date to today
  bookingForm: FormGroup;
  userId: string | null = null;

  services$: Observable<any[]>;
  selectedServiceSlots: string[] = [];


  constructor(private fb: FormBuilder,
     private snackBar: MatSnackBar,
     private bookingService: BookingService,
     private firestore: Firestore,
     private auth: Auth,
     private service :ServiceService
    ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      service: ['', Validators.required],
      date: ['', Validators.required],
      slot: ['', Validators.required],
    });

     // Fetch logged-in user ID
     this.auth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
    this.services$ = this.service.getServices();
  }

  get f() {
    return this.bookingForm.controls;
  }

  async submitBooking() {
    if (this.bookingForm.valid) {
      console.log('booking form is valid');
      const bookingData = {
        ...this.bookingForm.value,
        // userId: this.userId, // Store user ID
        // status: 'pending', // Default status
        // createdAt: new Date()
      };
      console.log('booking form is not valid',bookingData);
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

  onServiceChange(serviceName: string) {
    console.log('service name is',serviceName);
    const servicesRef = collection(this.firestore, 'services');
    const q = query(servicesRef, where('name', '==', serviceName));
    
    getDocs(q).then(snapshot => {
      const serviceData = snapshot.docs[0]?.data();
      this.selectedServiceSlots = serviceData?.['slots'] || [];
      console.log('changing the service event fired',this.selectedServiceSlots);
    });
  }


}



