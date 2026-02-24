import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationErrorsService } from '../../../core/services/validation-errors.service';
import { SelectFieldComponent, SelectOption } from '../../../shared/components/select-field.component';

@Component({
  selector: 'app-add-lead',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectFieldComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Add New Lead</h1>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Create a new lead and add them to your pipeline.</p>
            </div>
            <div class="flex space-x-3">
              <button (click)="cancel()" 
                      class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Cancel
              </button>
              <button (click)="saveLead()" 
                      [disabled]="isSubmitting"
                      class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50">
                <span *ngIf="isSubmitting">Saving...</span>
                <span *ngIf="!isSubmitting">Save Lead</span>
              </button>
            </div>
          </div>
        </div>

        <form [formGroup]="leadForm" class="space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Left Column - Contact & Company Info -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- Contact Information -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex items-center mb-6">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Information</h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name <span class="text-red-500">*</span>
                    </label>
                    <input formControlName="firstName" type="text" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('firstName'))">
                    <p *ngIf="validationService.hasError(leadForm.get('firstName'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('firstName'), 'First Name') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name <span class="text-red-500">*</span>
                    </label>
                    <input formControlName="lastName" type="text" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('lastName'))">
                    <p *ngIf="validationService.hasError(leadForm.get('lastName'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('lastName'), 'Last Name') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input formControlName="email" type="email" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('email'))">
                    <p *ngIf="validationService.hasError(leadForm.get('email'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('email'), 'Email') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                    <input formControlName="phone" type="tel" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('phone'))">
                    <p *ngIf="validationService.hasError(leadForm.get('phone'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('phone'), 'Phone') }}
                    </p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Title</label>
                    <input formControlName="jobTitle" type="text" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                  </div>
                </div>
              </div>

              <!-- Company Information -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex items-center mb-6">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Company Information</h3>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name <span class="text-red-500">*</span>
                    </label>
                    <input formControlName="companyName" type="text" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('companyName'))">
                    <p *ngIf="validationService.hasError(leadForm.get('companyName'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('companyName'), 'Company Name') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
                    <input formControlName="website" type="url" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                           [class.border-red-500]="validationService.hasError(leadForm.get('website'))">
                    <p *ngIf="validationService.hasError(leadForm.get('website'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('website'), 'Website') }}
                    </p>
                  </div>
                  
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Industry</label>
                    <app-select-field 
                      [options]="industryOptions"
                      [selectedValue]="leadForm.get('industry')?.value || ''"
                      placeholder="Select Industry"
                      (selectionChange)="onIndustryChange($event)">
                    </app-select-field>
                  </div>
                </div>
              </div>

              <!-- Address -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex items-center mb-6">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Address</h3>
                </div>
                
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
                    <input formControlName="streetAddress" type="text" 
                           class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                      <input formControlName="city" type="text" 
                             class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                      <input formControlName="state" type="text" 
                             class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                      <input formControlName="zipCode" type="text" 
                             class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                    <app-select-field 
                      [options]="countryOptions"
                      [selectedValue]="leadForm.get('country')?.value || ''"
                      placeholder="Select Country"
                      (selectionChange)="onCountryChange($event)">
                    </app-select-field>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex items-center mb-6">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Notes</h3>
                </div>
                
                <div>
                  <textarea formControlName="notes" rows="4" 
                            placeholder="Add any additional notes about this lead..."
                            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white resize-none">
                  </textarea>
                </div>
              </div>
            </div>

            <!-- Right Column - Lead Details & Quick Actions -->
            <div class="space-y-8">
              
              <!-- Lead Details -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div class="flex items-center mb-6">
                  <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Lead Details</h3>
                </div>
                
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lead Source <span class="text-red-500">*</span>
                    </label>
                    <app-select-field 
                      [options]="leadSourceOptions"
                      [selectedValue]="leadForm.get('leadSource')?.value || ''"
                      placeholder="Select Source"
                      (selectionChange)="onLeadSourceChange($event)">
                    </app-select-field>
                    <p *ngIf="validationService.hasError(leadForm.get('leadSource'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('leadSource'), 'Lead Source') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status <span class="text-red-500">*</span>
                    </label>
                    <app-select-field 
                      [options]="statusOptions"
                      [selectedValue]="leadForm.get('status')?.value || ''"
                      placeholder="Select Status"
                      (selectionChange)="onStatusChange($event)">
                    </app-select-field>
                    <p *ngIf="validationService.hasError(leadForm.get('status'))" 
                       class="mt-1 text-sm text-red-600">
                      {{ validationService.getErrorMessage(leadForm.get('status'), 'Status') }}
                    </p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Estimated Value</label>
                    <div class="relative">
                      <span class="absolute left-3 top-2 text-gray-500 dark:text-gray-400">$</span>
                      <input formControlName="estimatedValue" type="number" min="0" 
                             class="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                
                <div class="space-y-3">
                  <button type="button" 
                          class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Send Email
                  </button>
                  
                  <button type="button" 
                          class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Schedule Call
                  </button>
                  
                  <button type="button" 
                          class="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors">
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Create Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddLeadComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  validationService = inject(ValidationErrorsService);

  isSubmitting = false;
  leadForm: FormGroup;

  // Dropdown options
  industryOptions: SelectOption[] = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'other', label: 'Other' }
  ];

  countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'other', label: 'Other' }
  ];

  leadSourceOptions: SelectOption[] = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'email-campaign', label: 'Email Campaign' },
    { value: 'cold-call', label: 'Cold Call' },
    { value: 'trade-show', label: 'Trade Show' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];

  statusOptions: SelectOption[] = [
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed-won', label: 'Closed Won' },
    { value: 'closed-lost', label: 'Closed Lost' }
  ];

  constructor() {
    this.leadForm = this.fb.group({
      // Contact Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [ValidationErrorsService.phoneValidator]],
      jobTitle: [''],
      
      // Company Information
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      website: ['', [ValidationErrorsService.urlValidator]],
      industry: [''],
      
      // Address
      streetAddress: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
      
      // Lead Details
      leadSource: ['', [Validators.required]],
      status: ['new', [Validators.required]],
      estimatedValue: [0, [Validators.min(0)]],
      
      // Notes
      notes: ['']
    });
  }

  onIndustryChange(value: string) {
    this.leadForm.patchValue({ industry: value });
  }

  onCountryChange(value: string) {
    this.leadForm.patchValue({ country: value });
  }

  onLeadSourceChange(value: string) {
    this.leadForm.patchValue({ leadSource: value });
  }

  onStatusChange(value: string) {
    this.leadForm.patchValue({ status: value });
  }

  saveLead() {
    if (this.leadForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Lead saved:', this.leadForm.value);
        this.isSubmitting = false;
        this.router.navigate(['/leads']);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.validationService.markAllFieldsAsTouched(this.leadForm);
      
      // Get all validation errors
      const errors = this.validationService.validateAllFormFields(this.leadForm);
      console.log('Validation errors:', errors);
    }
  }

  cancel() {
    this.router.navigate(['/leads']);
  }
}
