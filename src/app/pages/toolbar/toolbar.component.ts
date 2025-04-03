import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginComponent } from '../../shared/login/login.component';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatDialogModule,
     MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  private dialog = inject(MatDialog);
  private authService = inject(AuthService);

  user$: Observable<User | null> = this.authService.user$; // Get user state
  isMobile: boolean = false;
  showProfileDropdown: boolean = false;

  constructor() {
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

  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  logout(){
    this.authService.logout(); // Implement logout logic
  }
}
