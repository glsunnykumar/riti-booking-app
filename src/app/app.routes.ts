import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'admin', component: AdminBookingComponent },  // Admin Panel
];
