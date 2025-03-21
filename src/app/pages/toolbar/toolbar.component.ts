import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
     MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  isMobile: boolean = false;
  showProfileDropdown: boolean = false;

  constructor(private authService: AuthService) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    console.log(window.innerWidth);
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.isMobile = !this.isMobile;
  }

  toggleProfile() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout(){
    this.authService.logout(); // Implement logout logic
    // localStorage.removeItem('user'); // Remove user data
    // this.router.navigate(['/login']); // Redirect to login page
  }
}
