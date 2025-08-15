import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NavBarComponent } from '../../UI/nav-bar.component/nav-bar.component';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DescriptionTemplate } from '../../UI/description-template/description-template';
import { PageTemplate } from '../../UI/page-template/page-template';

/**
 * Main application layout component with navigation drawer
 */
@Component({
  selector: 'cv-layout',
  standalone: true,
  imports: [
    ButtonModule,
    ToastModule,
    NavBarComponent,
    DrawerModule,
    PanelMenuModule,
    DescriptionTemplate,
    PageTemplate,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  /** Service for displaying toast messages */
  private readonly messageService = inject(MessageService);

  /** Reference to the NavBarComponent */
  @ViewChild(NavBarComponent) navBarComponent!: NavBarComponent;

  /** Controls visibility of the navigation drawer */
  public isDrawerVisible = signal(false);

  /**
   * Displays a toast notification
   * @param event - Toast event data containing severity, summary and detail
   */
  public showToast(event: {
    severity: string;
    summary: string;
    detail: string;
  }): void {
    this.messageService.add({
      severity: event.severity,
      summary: event.summary,
      detail: event.detail,
      life: 3000,
    });
  }

  /**
   * Toggles the navigation drawer visibility
   */
  public toggleDrawer(): void {
    this.isDrawerVisible.update((visible) => !visible);
  }

  /**
   * Handles drawer visibility changes
   * @param visible - New visibility state
   */
  // In your NavBarComponent or LayoutComponent
  onDrawerVisibleChange(event: Event | boolean) {
    const isVisible =
      typeof event === 'boolean' ? event : (event as CustomEvent).detail;
    this.isDrawerVisible.set(isVisible);
  }
}
