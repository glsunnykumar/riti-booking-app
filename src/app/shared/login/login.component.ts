import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  private dialogRef = inject(MatDialogRef<LoginComponent>);

  constructor(private fb: FormBuilder, private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      this.dialogRef.close(); // Close modal after login
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  forgotPassword() {
    console.log('Forgot Password Clicked');
  }

  register() {
    console.log('Register Clicked');
  }

}
