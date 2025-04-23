import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServiceFormComponent } from '../service-form/service-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceModel } from '../../models/service.model';
import { ServiceService } from '../../services/service/service.service';


@Component({
  selector: 'app-service-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './service-table.component.html',
  styleUrl: './service-table.component.scss'
})
export class ServiceTableComponent implements OnInit {

  private serviceService = inject(ServiceService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'price', 'duration', 'status', 'actions'];
  services: ServiceModel[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.serviceService.getServices().subscribe((res) => {
      this.services = res;
      this.isLoading = false;
    });
  }

  openServiceForm(service?: ServiceModel) {
    const dialogRef = this.dialog.open(ServiceFormComponent, {
      width: '90vw',          // For small screens
      maxWidth: '500px',      // Keeps it tidy on large screens
      data: service,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchServices();
      }
    });
  }

  deleteService(id: string) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(id).then(() => this.fetchServices());
    }
  }

}
