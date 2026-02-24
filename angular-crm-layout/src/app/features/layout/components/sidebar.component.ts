import { Component, signal, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-template.html'
})
export class SidebarComponent {
  private themeService = inject(ThemeService);
  isOpen = signal(false);
  isCollapsed = signal(false);
  
  // Menu section states
  dashboardOpen = signal(false);
  leadsOpen = signal(true);
  contactsOpen = signal(false);
  salesOpen = signal(false);
  marketingOpen = signal(false);
  supportOpen = signal(false);
  projectsOpen = signal(false);
  inventoryOpen = signal(false);
  financeOpen = signal(false);
  analyticsOpen = signal(false);
  automationOpen = signal(false);
  settingsOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        this.isCollapsed.set(JSON.parse(savedState));
      }
    }
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed()));
    }
  }

  getCollapsedState() {
    return this.isCollapsed();
  }


  toggleSection(section: string) {
    switch(section) {
      case 'dashboard': this.dashboardOpen.set(!this.dashboardOpen()); break;
      case 'leads': this.leadsOpen.set(!this.leadsOpen()); break;
      case 'contacts': this.contactsOpen.set(!this.contactsOpen()); break;
      case 'sales': this.salesOpen.set(!this.salesOpen()); break;
      case 'marketing': this.marketingOpen.set(!this.marketingOpen()); break;
      case 'support': this.supportOpen.set(!this.supportOpen()); break;
      case 'projects': this.projectsOpen.set(!this.projectsOpen()); break;
      case 'inventory': this.inventoryOpen.set(!this.inventoryOpen()); break;
      case 'finance': this.financeOpen.set(!this.financeOpen()); break;
      case 'analytics': this.analyticsOpen.set(!this.analyticsOpen()); break;
      case 'automation': this.automationOpen.set(!this.automationOpen()); break;
      case 'settings': this.settingsOpen.set(!this.settingsOpen()); break;
    }
  }
}
