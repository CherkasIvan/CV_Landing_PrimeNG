import { Component, inject, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cv-main',
  standalone: true,
  imports: [ToastModule, FileUploadModule, ButtonModule],
  templateUrl: './main.page.html',
  styleUrl: './main.page.scss',
})
export class MainPage {
  public isNavVisible = signal(false);

  onUpload(event: any) {
    console.log('File uploaded:', event);
  }

  constructor() {
    console.log('MainPage loaded');
  }
}
