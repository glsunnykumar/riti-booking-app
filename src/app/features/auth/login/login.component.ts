import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  //loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

 

 

  login() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      signInWithEmailAndPassword(this.auth, email, password)
        .then(user => console.log('Logged in:', user))
        .catch(err => console.error('Login error:', err));
    }

}
}
