import { Component, EventEmitter, Output } from '@angular/core';  
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule,MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  isCollapsed = false; // Sidebar state

  onLinkClick() {
    this.sidebarToggle.emit();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
