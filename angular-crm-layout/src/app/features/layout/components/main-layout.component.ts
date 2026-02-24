import { Component, ViewChild, signal, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { HeaderComponent } from './header.component';
import { LeadsTableSimpleComponent } from '../../leads/components/leads-table-simple.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, LeadsTableSimpleComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Sidebar -->
      <app-sidebar #sidebar></app-sidebar>
      
      <!-- Header -->
      <app-header (toggleSidebar)="handleSidebarToggle()" [sidebarCollapsed]="sidebarCollapsed()"></app-header>
      
      <!-- Main content -->
      <main class="transition-all duration-300 ease-in-out pt-16"
            [class.lg:ml-64]="!sidebarCollapsed()"
            [class.lg:ml-16]="sidebarCollapsed()">
        <div class="p-6">
          <app-leads-table-simple></app-leads-table-simple>
        </div>
      </main>
    </div>
  `
})
export class MainLayoutComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  sidebarCollapsed = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Initialize sidebar state after view is ready
    if (isPlatformBrowser(this.platformId) && this.sidebar) {
      this.sidebarCollapsed.set(this.sidebar.getCollapsedState());
    }
  }

  handleSidebarToggle() {
    if (!this.sidebar) return;
    
    if (isPlatformBrowser(this.platformId)) {
      // For mobile: toggle open/close
      if (window.innerWidth < 1024) {
        this.sidebar.toggle();
      } else {
        // For desktop/tablet: toggle collapse/expand
        this.sidebar.toggleCollapse();
        this.sidebarCollapsed.set(this.sidebar.getCollapsedState());
      }
    }
  }
}
