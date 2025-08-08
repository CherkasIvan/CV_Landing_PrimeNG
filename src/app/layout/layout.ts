import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../UI/nav-bar.component/nav-bar.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'cv-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, ButtonModule, ToastModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  providers: [MessageService],
})
export class Layout {
  isNavVisible = signal(false);

  constructor(private messageService: MessageService) {}

  showToast(event: { severity: string; summary: string; detail: string }) {
    this.messageService.add({
      severity: event.severity,
      summary: event.summary,
      detail: event.detail,
      life: 3000,
    });
  }
}
