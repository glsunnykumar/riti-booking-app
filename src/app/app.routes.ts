import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PaymentComponent } from './pages/payment/payment.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'payment', component: PaymentComponent },
    { path: '', redirectTo: '/booking', pathMatch: 'full' },
    //{ path: '', redirectTo: 'login', pathMatch: 'full' }
];
