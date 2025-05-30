import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // or modular API
import { Firestore } from '@angular/fire/firestore';
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
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ImageUploadService } from '../../services/image-upload/image-upload.service';

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
  private imageUploadService = inject(ImageUploadService);
 

  @Input() serviceData?: ServiceModel;

  storage = inject(Storage); // modular injection
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  downloadURL: string = '';
  dialogRef = inject(MatDialogRef<ServiceFormComponent>);
  data = inject<ServiceModel>(MAT_DIALOG_DATA);
  serviceForm!: FormGroup;
  isEditMode: boolean = false;


  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      duration: ['', Validators.required],
      image: [null], // not strictly required, but can be used to track file
      status: [true, Validators.required],
    });

    if (this.serviceData) {
      this.isEditMode = true;
      this.serviceForm.patchValue(this.serviceData);
    }
  }

  async onSubmit() {
    console.log('adding the service');
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;
      const slots = this.generateTimeSlots(+formValue.duration);
      let imageUrl: string | null = null;
      if (this.selectedFile) {
        const filePath = `services/${this.selectedFile.name}`;
        imageUrl = await this.imageUploadService.uploadImage(this.selectedFile, filePath);
      }
      const  serviceData = {
        ...this.serviceForm.value as ServiceModel,
        imageUrl: imageUrl ?? null,
        slots
      };

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.onload = () => this.imagePreviewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  generateTimeSlots(duration: number): string[] {
    const slots: string[] = [];
    const start = new Date();
    start.setHours(9, 0, 0, 0);
  
    const end = new Date();
    end.setHours(17, 0, 0, 0);
  
    while (start < end) {
      const lunchStart = new Date();
      lunchStart.setHours(13, 0, 0, 0);
      const lunchEnd = new Date();
      lunchEnd.setHours(14, 0, 0, 0);
  
      const slotEnd = new Date(start.getTime() + duration * 60000);
  
      if (slotEnd > end) break;
      if (start >= lunchStart && start < lunchEnd) {
        start.setTime(lunchEnd.getTime());
        continue;
      }
  
      const format = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
      slots.push(`${format(start)} - ${format(slotEnd)}`);
      start.setTime(start.getTime() + duration * 60000);
    }
  
    return slots;
  }
  


}
