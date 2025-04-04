import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  bookingService = inject(BookingService);

  totalBookings = signal(0);
  pendingBookings = signal(0);
  completedBookings = signal(0);
  totalRevenue = signal(0);

  recentBookings = signal<any[]>([]);

  constructor(){
    this.fetchDashboardData();
  }


  fetchDashboardData() {
    this.bookingService.getAllBookings().subscribe((bookings) => {
      this.totalBookings.set(bookings.length);
      this.pendingBookings.set(bookings.filter(b => b.status === 'pending').length);
      this.completedBookings.set(bookings.filter(b => b.status === 'completed').length);
      this.totalRevenue.set(bookings.reduce((acc, b) => acc + (b.amount || 0), 0));
      this.recentBookings.set(bookings.slice(0, 5));
    });
  }

}
