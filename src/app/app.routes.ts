import { Routes } from '@angular/router';
import { BookingComponent } from './pages/booking/booking.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminBookingComponent } from './admin/admin-booking/admin-booking.component';
import { AdminGuard } from './guard/admin.guard';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ServiceFormComponent } from './admin/service-form/service-form.component';
import { ServiceTableComponent } from './admin/service-table/service-table.component';
import { ServiceComponent } from './pages/service/service.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path :'home',component : HomeComponent},
    { path: 'bookings', component: BookingComponent },
    { path: 'services', component: ServiceComponent },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AdminGuard],
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'bookings', component: AdminBookingComponent },
          {path: 'services',component :ServiceTableComponent},
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
];
