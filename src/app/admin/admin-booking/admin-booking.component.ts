import { Component, OnInit } from '@angular/core';
import { Booking, BookingService } from '../../services/booking/booking.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-admin-booking',
  imports: [MatIconModule,MatSelectModule,MatTableModule],
  templateUrl: './admin-booking.component.html',
  styleUrl: './admin-booking.component.scss'
})
export class AdminBookingComponent implements OnInit {
  bookings: Booking[] = [];
  
  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  updateStatus(bookingId: string, status: 'Pending' | 'Confirmed' | 'Cancelled') {
    this.bookingService.updateBookingStatus(bookingId, status);
  }

  deleteBooking(bookingId: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId);
    }
  }

}
