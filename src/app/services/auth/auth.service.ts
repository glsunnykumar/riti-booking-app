import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user'); // Remove user data
    this.router.navigate(['/login']); // Redirect to login page
  }
}
