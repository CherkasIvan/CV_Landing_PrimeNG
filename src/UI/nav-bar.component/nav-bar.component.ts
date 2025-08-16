import {
  Component,
  inject,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../core/services/theme.service/theme.service';
import { createMenuItems } from '../../utils/constants/menu-items.const';
import { FirebaseService } from '../../core/services/firebase.service/firebase.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

/**
 * Navigation bar component with theme toggle and drawer functionality
 */
@Component({
  selector: 'cv-nav-bar',
  standalone: true,
  imports: [
    ButtonModule,
    PanelMenuModule,
    FormsModule,
    ToggleSwitchModule,
    NgClass,
    CardModule,
    AvatarGroupModule,
    AvatarModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  /** Router service for navigation */
  private readonly router = inject(Router);

  /** Activated route service */
  private readonly firebaseService = inject(FirebaseService);

  private readonly route = inject(ActivatedRoute);

  /** Theme service for managing application theme */
  public readonly themeService = inject(ThemeService);

  /** Controls visibility of the navigation bar */
  public isNavBarVisible = model.required<boolean>();

  public isAuthenticated = signal(false);

  /** Event emitter for toast notifications */
  public toastEvent = output<{
    severity: string;
    summary: string;
    detail: string;
  }>();

  /** Menu items for the navigation */
  public items: MenuItem[] = [];

  /** Current theme state */
  public checked = this.themeService.initTheme();

  /**
   * Handles theme change events
   * @param isDarkMode - Boolean indicating if dark mode is enabled
   */
  public onThemeChange(isDarkMode: boolean): void {
    this.themeService.setTheme(isDarkMode);
    this.toastEvent.emit({
      severity: 'info',
      summary: 'Theme changed',
      detail: `Switched to ${isDarkMode ? 'dark' : 'light'} mode`,
    });
  }

  logout() {
    this.firebaseService.signOut().subscribe({
      next: () => {
        localStorage.removeItem('user'); // Clear local storage
        this.router.navigate(['/auth']); // Redirect to auth page
      },
      error: (err) => {
        console.error('Logout failed:', err);
      },
    });
  }

  /**
   * Navigates to a route and shows toast notification
   * @param route - Array of route segments
   */
  private navigateWithToast(route: string[]): void {
    this.router
      .navigate(route, { relativeTo: this.route.parent })
      .then((success) => {
        if (success) {
          this.toastEvent.emit({
            severity: 'success',
            summary: 'Navigation',
            detail: `Successfully navigated to ${route.join('/')}`,
          });
          this.isNavBarVisible.set(false);
        } else {
          this.toastEvent.emit({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to navigate',
          });
        }
      })
      .catch((error) => {
        console.error('Navigation error:', error);
        this.toastEvent.emit({
          severity: 'error',
          summary: 'Navigation error',
          detail: 'An error occurred during navigation',
        });
      });
  }

  public handleLogout(): void {
    this.firebaseService.signOut().subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.router.navigate(['/auth']);
        this.toastEvent.emit({
          severity: 'success',
          summary: 'Signed out',
          detail: 'User logged out successfully',
        });
        this.isNavBarVisible.set(false);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.toastEvent.emit({
          severity: 'error',
          summary: 'Logout failed',
          detail: 'Error during logout',
        });
      },
    });
  }

  private checkAuthStatus(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.isAuthenticated.set(!!user.email);
      } catch {
        this.isAuthenticated.set(false);
      }
    } else {
      this.isAuthenticated.set(false);
    }
  }

  public ngOnInit() {
    this.checkAuthStatus();

    this.items = createMenuItems({
      navigateWithToast: this.navigateWithToast.bind(this),
      toastEvent: this.toastEvent,
      isNavBarVisible: this.isNavBarVisible,
      firebaseService: this.firebaseService, // Pass the service
      router: this.router, // Pass the router
    });
  }
}
