import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        (click)="toggleDropdown()"
        class="relative w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
        [class.ring-1]="isOpen()"
        [class.ring-purple-500]="isOpen()"
        [class.border-purple-500]="isOpen()"
      >
        <span class="flex items-center">
          <span *ngIf="selectedOption()?.icon" class="w-4 h-4 mr-2" [innerHTML]="selectedOption()?.icon"></span>
          <span class="block truncate text-gray-900 dark:text-white">
            {{ selectedOption()?.label || placeholder }}
          </span>
        </span>
        <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-5 w-5 text-gray-400 transition-transform" 
               [class.rotate-180]="isOpen()"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>

      <!-- Dropdown panel -->
      <div *ngIf="isOpen()" 
           class="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-200 dark:border-gray-600">
        <div *ngFor="let option of options" 
             (click)="selectOption(option)"
             class="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
             [class.bg-purple-50]="selectedValue === option.value"
             [class.dark:bg-purple-900/20]="selectedValue === option.value">
          <div class="flex items-center">
            <span *ngIf="option.icon" class="w-4 h-4 mr-2" [innerHTML]="option.icon"></span>
            <span class="block truncate text-gray-900 dark:text-white"
                  [class.font-medium]="selectedValue === option.value">
              {{ option.label }}
            </span>
          </div>
          
          <span *ngIf="selectedValue === option.value" 
                class="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-600 dark:text-purple-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Overlay to close dropdown when clicking outside -->
    <div *ngIf="isOpen()" 
         (click)="closeDropdown()"
         class="fixed inset-0 z-0"></div>
  `
})
export class SelectFieldComponent {
  @Input() options: SelectOption[] = [];
  @Input() selectedValue: string = '';
  @Input() placeholder: string = 'Select option';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = signal(false);

  selectedOption = signal<SelectOption | undefined>(undefined);

  ngOnInit() {
    this.updateSelectedOption();
  }

  ngOnChanges() {
    this.updateSelectedOption();
  }

  private updateSelectedOption() {
    const option = this.options.find(opt => opt.value === this.selectedValue);
    this.selectedOption.set(option);
  }

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  closeDropdown() {
    this.isOpen.set(false);
  }

  selectOption(option: SelectOption) {
    this.selectedValue = option.value;
    this.selectedOption.set(option);
    this.selectionChange.emit(option.value);
    this.closeDropdown();
  }
}
