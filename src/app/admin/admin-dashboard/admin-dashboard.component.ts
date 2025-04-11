import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking/booking.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EditBookingDialogComponent } from '../../features/edit-booking-dialog/edit-booking-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../features/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatDialogModule
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

  constructor(private dialog: MatDialog,private breakpointObserver: BreakpointObserver){
    this.fetchDashboardData();
  }

  openEditDialog(booking: any): void {
    const isSmallScreen = this.breakpointObserver.isMatched(Breakpoints.Handset);
    
    const dialogRef = this.dialog.open(EditBookingDialogComponent, {
      width: '400px',
      data: booking
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // handle the update
        console.log('Updated Booking:', result);
      }
    });
  }

  openConfirmDialog(booking: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete the booking for ${booking.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        // handle the delete
        console.log('Booking deleted:', booking.id);
      }
    });
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
