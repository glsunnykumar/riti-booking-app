import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SidebarComponent
  ]
})
export class AdminLayoutComponent {
  isCollapsed = signal(false);
  isMobile = signal(false);

  constructor(private breakpointObserver: BreakpointObserver){
    this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Tablet])
    .subscribe(result  =>{
      this.isMobile.set(result.matches);
      if (result.matches) {
        this.isCollapsed.set(true);
      }
    })
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}