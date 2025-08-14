import { Component, inject, model, output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service/theme.service';
import { createMenuItems } from '../../utils/constants/menu-items.const';

@Component({
  selector: 'cv-nav-bar',
  standalone: true,
  imports: [
    DrawerModule,
    ButtonModule,
    PanelMenuModule,
    FormsModule,
    ToggleSwitch,
    NgClass,
    CardModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private themeService = inject(ThemeService);
  public isNavBarVisible = model.required<boolean>();
  public isNavVisible = signal(false);

  public toastEvent = output<{
    severity: string;
    summary: string;
    detail: string;
  }>();
  public items: MenuItem[];
  public checked = this.themeService.initTheme();

  onThemeChange(isDarkMode: boolean) {
    this.themeService.setTheme(isDarkMode);

    this.toastEvent.emit({
      severity: 'info',
      summary: 'Theme changed',
      detail: `Switched to ${isDarkMode ? 'dark' : 'light'} mode`,
    });
  }

  private navigateWithToast(route: string[]): void {
    this.router
      .navigate(route, { relativeTo: this.route.parent })
      .then((success) => {
        if (success) {
          this.toastEvent.emit({
            severity: 'success',
            summary: 'Навигация',
            detail: `Успешный переход на ${route.join('/')}`,
          });
          this.isNavBarVisible.set(false);
        } else {
          this.toastEvent.emit({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось выполнить переход',
          });
        }
      })
      .catch((error) => {
        console.error('Navigation error:', error);
        this.toastEvent.emit({
          severity: 'error',
          summary: 'Ошибка навигации',
          detail: 'Произошла ошибка при переходе',
        });
      });
  }
  public constructor() {
    this.isNavVisible.set(true);

    this.items = createMenuItems({
      navigateWithToast: this.navigateWithToast.bind(this),
      toastEvent: this.toastEvent,
      isNavBarVisible: this.isNavBarVisible,
    });
  }
}
