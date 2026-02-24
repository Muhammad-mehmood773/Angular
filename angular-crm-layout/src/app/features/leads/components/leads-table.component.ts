import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

interface Lead {
  id: string;
  name: string;
  location: string;
  company: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Negotiation';
  source: string;
  value: number;
  score: number;
  owner: string;
  ownerInitials: string;
  created: string;
}

@Component({
  selector: 'app-leads-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-900 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      
      <!-- Table Header with Stats -->
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">All Leads</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">Manage and track all your leads in one place.</p>
          </div>
          <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Import
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Leads</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">6</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">New Leads</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">2</p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Qualified</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">1</p>
              </div>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">$295K</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input type="text" 
                     placeholder="Search leads..."
                     class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <select class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>All Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Proposal</option>
              <option>Negotiation</option>
            </select>

            <select class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
              <option>All Sources</option>
              <option>Website</option>
              <option>Referral</option>
              <option>LinkedIn</option>
              <option>Email Campaign</option>
              <option>Trade Show</option>
            </select>

            <button class="p-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Lead
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Source
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Owner
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngFor="let lead of leads" class="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{lead.name}}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{lead.location}}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{lead.company}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{lead.email}}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{lead.phone}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span [ngClass]="getStatusClass(lead.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{lead.status}}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{lead.source}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ '$' + lead.value.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-900 dark:text-white mr-2">{{lead.score}}</span>
                  <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div [style.width.%]="lead.score" [ngClass]="getScoreClass(lead.score)" class="h-2 rounded-full"></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div [style.background-color]="getOwnerColor(lead.ownerInitials)" class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {{lead.ownerInitials}}
                  </div>
                  <span class="ml-2 text-sm text-gray-900 dark:text-white">{{lead.owner}}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{lead.created}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white dark:bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Previous
          </button>
          <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing <span class="font-medium">6</span> of <span class="font-medium">6</span> leads
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                Previous
              </button>
              <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LeadsTableComponent {
  private themeService = inject(ThemeService);

  leads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      location: 'San Francisco, CA',
      company: 'TechCorp Inc.',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      status: 'New',
      source: 'Website',
      value: 45000,
      score: 85,
      owner: 'Sarah Johnson',
      ownerInitials: 'SJ',
      created: 'Jan 15, 2024'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      location: 'New York, NY',
      company: 'Global Solutions',
      email: 'emily@globalsolutions.com',
      phone: '+1 (555) 234-5678',
      status: 'Contacted',
      source: 'Referral',
      value: 32000,
      score: 72,
      owner: 'Michael Chen',
      ownerInitials: 'MC',
      created: 'Jan 12, 2024'
    },
    {
      id: '3',
      name: 'David Kim',
      location: 'Austin, TX',
      company: 'Innovate Labs',
      email: 'david.kim@innovatelabs.com',
      phone: '+1 (555) 345-6789',
      status: 'Qualified',
      source: 'LinkedIn',
      value: 28000,
      score: 68,
      owner: 'Sarah Johnson',
      ownerInitials: 'SJ',
      created: 'Jan 10, 2024'
    },
    {
      id: '4',
      name: 'Lisa Anderson',
      location: 'Seattle, WA',
      company: 'Digital Ventures',
      email: 'lisa@digitalventures.com',
      phone: '+1 (555) 456-7890',
      status: 'Proposal',
      source: 'Email Campaign',
      value: 55000,
      score: 92,
      owner: 'Emily Rodriguez',
      ownerInitials: 'ER',
      created: 'Jan 8, 2024'
    },
    {
      id: '5',
      name: 'Robert Taylor',
      location: 'Boston, MA',
      company: 'Cloud Systems',
      email: 'robert@cloudsystems.com',
      phone: '+1 (555) 567-8901',
      status: 'Negotiation',
      source: 'Trade Show',
      value: 67000,
      score: 78,
      owner: 'Michael Chen',
      ownerInitials: 'MC',
      created: 'Jan 5, 2024'
    },
    {
      id: '6',
      name: 'Jennifer White',
      location: 'Chicago, IL',
      company: 'Data Analytics Pro',
      email: 'jennifer@dataanalytics.com',
      phone: '+1 (555) 678-9012',
      status: 'New',
      source: 'Website',
      value: 38000,
      score: 65,
      owner: 'Sarah Johnson',
      ownerInitials: 'SJ',
      created: 'Jan 14, 2024'
    }
  ];

  getStatusClass(status: string): string {
    const statusClasses = {
      'New': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'Contacted': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Qualified': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'Proposal': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'Negotiation': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  }

  getScoreClass(score: number): string {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  getOwnerColor(initials: string): string {
    const colors = {
      'SJ': '#8B5CF6', // purple
      'MC': '#3B82F6', // blue
      'ER': '#EF4444'  // red
    };
    return colors[initials as keyof typeof colors] || '#6B7280';
  }

  formatCurrency(value: number): string {
    return `$${value.toLocaleString()}`;
  }
}
