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
import { finalize } from 'rxjs/operators';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

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
  private firestore = inject(Firestore);
 

  @Input() serviceData?: ServiceModel;

  storage = inject(Storage); // modular injection
  selectedFile: File | null = null;
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
      imageUrl: [''],
      status: [true, Validators.required],
    });

    if (this.serviceData) {
      this.isEditMode = true;
      this.serviceForm.patchValue(this.serviceData);
    }
  }

  onSubmit(): void {
    console.log('adding the service');
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;
      const slots = this.generateTimeSlots(+formValue.duration);
      const  serviceData = {
        ...this.serviceForm.value as ServiceModel,
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
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const filePath = `services/${Date.now()}_${this.selectedFile.name}`;
      const fileRef = ref(this.storage, filePath);
  
      uploadBytes(fileRef, this.selectedFile)
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          this.downloadURL = url;
          console.log('File uploaded. URL:', url);
        })
        .catch((error) => {
          console.error('Upload failed', error);
        });
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
