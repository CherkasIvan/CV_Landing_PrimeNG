import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { NavBarComponent } from '../../UI/nav-bar.component/nav-bar.component';
@Component({
  selector: 'cv-layout',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, ToastModule, NavBarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private messageService = inject(MessageService);

  checked: boolean = false;
  blockedPanel: boolean = false;
  public isNavVisible = signal(false);

  showToast(event: { severity: string; summary: string; detail: string }) {
    this.messageService.add({
      severity: event.severity,
      summary: event.summary,
      detail: event.detail,
      life: 3000,
    });
  }
}
