import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorsService {

  private errorMessages: { [key: string]: string } = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: 'This field is too short',
    maxlength: 'This field is too long',
    pattern: 'Please enter a valid format',
    min: 'Value is too small',
    max: 'Value is too large',
    phone: 'Please enter a valid phone number',
    url: 'Please enter a valid URL'
  };

  constructor() { }

  getErrorMessage(control: AbstractControl | null, fieldName?: string): string {
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    const errors = control.errors;
    
    // Check for specific error types
    if (errors['required']) {
      return fieldName ? `${fieldName} is required` : this.errorMessages['required'];
    }
    
    if (errors['email']) {
      return this.errorMessages['email'];
    }
    
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `Minimum ${requiredLength} characters required`;
    }
    
    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `Maximum ${requiredLength} characters allowed`;
    }
    
    if (errors['pattern']) {
      return this.errorMessages['pattern'];
    }
    
    if (errors['min']) {
      return `Minimum value is ${errors['min'].min}`;
    }
    
    if (errors['max']) {
      return `Maximum value is ${errors['max'].max}`;
    }
    
    if (errors['phone']) {
      return this.errorMessages['phone'];
    }
    
    if (errors['url']) {
      return this.errorMessages['url'];
    }

    // Return first error message if no specific match
    const firstErrorKey = Object.keys(errors)[0];
    return this.errorMessages[firstErrorKey] || 'Invalid input';
  }

  hasError(control: AbstractControl | null): boolean {
    return !!(control && control.errors && control.touched);
  }

  markAllFieldsAsTouched(formGroup: any): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        // If it's a nested form group, recursively mark all fields
        if (control instanceof Object && control.controls) {
          this.markAllFieldsAsTouched(control);
        }
      }
    });
  }

  validateAllFormFields(formGroup: any): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
        
        if (control.errors) {
          errors[key] = this.getErrorMessage(control, key);
        }
        
        // Handle nested form groups
        if (control instanceof Object && control.controls) {
          const nestedErrors = this.validateAllFormFields(control);
          Object.keys(nestedErrors).forEach(nestedKey => {
            errors[`${key}.${nestedKey}`] = nestedErrors[nestedKey];
          });
        }
      }
    });
    
    return errors;
  }

  // Custom validators
  static phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(control.value) ? null : { phone: true };
  }

  static urlValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlRegex.test(control.value) ? null : { url: true };
  }
}
