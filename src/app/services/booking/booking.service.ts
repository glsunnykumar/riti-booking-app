import { inject, Injectable } from '@angular/core';
import {Firestore, collection, collectionData, updateDoc, doc, deleteDoc, addDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Booking {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';  // New status field
}


@Injectable({
  providedIn: 'root'
})


export class BookingService {
  private firestore: Firestore = inject(Firestore);
  private bookingCollection = collection(this.firestore, 'bookings');

  constructor() { }

  async addBooking(booking: Booking) {
    try {
      await addDoc(this.bookingCollection, booking);
      console.log('Booking successfully added!');
    } catch (error) {
      console.error('Error adding booking:', error);
    }
  }

   // Get all bookings
   getBookings(): Observable<Booking[]> {
    return collectionData(this.bookingCollection, { idField: 'id' }) as Observable<Booking[]>;
  }

  
  // Update booking status
  async updateBookingStatus(id: string, status: 'Pending' | 'Confirmed' | 'Cancelled') {
    const bookingRef = doc(this.firestore, `bookings/${id}`);
    await updateDoc(bookingRef, { status });
  }

  // Delete booking
  async deleteBooking(id: string) {
    const bookingRef = doc(this.firestore, `bookings/${id}`);
    await deleteDoc(bookingRef);
  }

}
