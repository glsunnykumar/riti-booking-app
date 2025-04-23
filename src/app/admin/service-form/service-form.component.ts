import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../services/service/service.service';
import { ServiceModel } from '../../models/service.model';

@Component({
  selector: 'app-service-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.scss',
})
export class ServiceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private serviceService = inject(ServiceService);
  dialogRef = inject(MatDialogRef<ServiceFormComponent>);
  data = inject<ServiceModel>(MAT_DIALOG_DATA);

  @Input() serviceData?: ServiceModel;

  serviceForm!: FormGroup;
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      duration: ['', Validators.required],
      imageUrl: [''],
      status: [true, Validators.required],
    });

    if (this.serviceData) {
      this.isEditMode = true;
      this.serviceForm.patchValue(this.serviceData);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value as ServiceModel;

      if (this.data?.id) {
        // Update existing
        this.serviceService.updateService(this.data.id, serviceData)
          .then(() => this.dialogRef.close(true));
      } else {
        // Create new
        this.serviceService.addService(serviceData)
          .then(() => this.dialogRef.close(true));
      }
    }
 
  }
}
