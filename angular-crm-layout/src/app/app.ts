import { Component } from '@angular/core';
import { MainLayoutComponent } from './features/layout/components/main-layout.component';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  template: '<app-main-layout></app-main-layout>',
  styleUrl: './app.css'
})
export class App {}
