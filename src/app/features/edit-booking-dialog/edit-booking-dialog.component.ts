import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-edit-booking-dialog',
  templateUrl: './edit-booking-dialog.component.html',
  styleUrl: './edit-booking-dialog.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule
  ]
})
export class EditBookingDialogComponent {

  bookingForm: FormGroup;

  constructor( private fb: FormBuilder,
    private bookingService :BookingService,
    public dialogRef: MatDialogRef<EditBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      console.log('data saved is',data);
       // Convert Firestore Timestamp to yyyy-MM-dd format if it exists
  // const formattedDate = data.date?.toDate
  // ? data.date.toDate().toISOString().split('T')[0]
  // : '';
      this.bookingForm = this.fb.group({
        name: [data.name, Validators.required],
        email: [data.email, [Validators.required, Validators.email]],
        date: [data.date, Validators.required],
        time: [data.time, Validators.required],
        status: [data.status, Validators.required]
      });
    }

    save() {
      if (this.bookingForm.valid) {
        this.bookingService.updateBooking(this.data.id, this.bookingForm.value)
          .then(() => {
            this.dialogRef.close(true); // Notify parent to refresh
          })
          .catch(err => console.error('Update Error:', err));
      }
    }
  
    cancel() {
      this.dialogRef.close();
    }

}
