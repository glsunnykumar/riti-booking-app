import { inject, Injectable } from '@angular/core';
import {Firestore, collection, collectionData, updateDoc, doc, deleteDoc, addDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Booking {
  id?: string;
  customerName: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  amount: number;
}


@Injectable({
  providedIn: 'root'
})


export class BookingService {
  private firestore: Firestore = inject(Firestore);
  private bookingCollection = collection(this.firestore, 'bookings');

  constructor() { }
  
  // Get all bookings from Firestore
  getAllBookings(): Observable<Booking[]> {
    return collectionData(this.bookingCollection, { idField: 'id' }) as Observable<Booking[]>;
  }

  // Create a new booking
  addBooking(booking: Booking) {
    return addDoc(this.bookingCollection, booking);
  }

  // Update booking status
  updateBooking(bookingId: string, updatedData: Partial<Booking>) {
    const bookingRef = doc(this.firestore, `bookings/${bookingId}`);
    return updateDoc(bookingRef, updatedData);
  }

  // Delete a booking
  deleteBooking(bookingId: string) {
    const bookingRef = doc(this.firestore, `bookings/${bookingId}`);
    return deleteDoc(bookingRef);
  }

}
