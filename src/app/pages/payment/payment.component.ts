import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api/api.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  imports:[
    ReactiveFormsModule,
     MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
  ],

  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.paymentForm = this.fb.group({
      amount: [null, Validators.required],
      currency: ['usd', Validators.required],
      token: ['', Validators.required], // This will come from Stripe frontend SDK
    });
  }

  // 🔹 Submit Payment Form
  submitPayment() {
    if (this.paymentForm.valid) {
      this.apiService.processPayment(this.paymentForm.value).subscribe(response => {
        console.log('Payment Successful:', response);
        alert('Payment processed successfully!');
      }, error => {
        console.error('Error processing payment:', error);
      });
    }
  }
}
