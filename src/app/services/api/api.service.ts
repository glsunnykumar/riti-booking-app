import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  private apiUrl = 'http://localhost:5000/api'; // Your backend URL

  constructor(private http: HttpClient) { }

   // 🔹 Create a booking
   createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, bookingData);
  }

   // 🔹 Get all bookings
   getBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  // 🔹 Process a payment
  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments`, paymentData);
  }
}
