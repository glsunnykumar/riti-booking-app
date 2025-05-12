import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../services/service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  imports: [MatCardModule,
            CommonModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent   {

  services$: Observable<ServiceModel[]>;

  constructor(private serviceService: ServiceService,private router: Router) {
    this.services$ = this.serviceService.getServices();
  }


  bookService(service: any) {
    // Navigate to booking page or show modal with selected service
     this.router.navigate(['/bookings'], { queryParams: { id: service.id } });
    console.log('Selected Service:', service);
  }

}
