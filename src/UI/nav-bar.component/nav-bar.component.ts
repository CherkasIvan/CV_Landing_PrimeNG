import { Component, inject, model, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ERoute } from '../../utils/constants/route.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cv-nav-bar',
  standalone: true,
  imports: [DrawerModule, ButtonModule, PanelMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public isNavBarVisible = model.required<boolean>();
  public toastEvent = output<{
    severity: string;
    summary: string;
    detail: string;
  }>();

  public items: MenuItem[] = [
    {
      label: 'Главная',
      icon: 'pi pi-home',
      command: () =>
        this.navigateWithToast([ERoute.LAYOUT, ERoute.MAIN], 'Главная'),
    },
    {
      label: 'Проекты',
      icon: 'pi pi-folder',
      command: () =>
        this.navigateWithToast([ERoute.LAYOUT, ERoute.PROJECTS], 'Проекты'),
    },
    {
      label: 'Опыт',
      icon: 'pi pi-briefcase',
      items: [
        {
          label: 'Обучение',
          icon: 'pi pi-book',
          command: () =>
            this.navigateWithToast(
              [ERoute.LAYOUT, ERoute.EXPERIENCE, 'education'],
              'Обучение'
            ),
        },
        {
          label: 'Рабочий опыт',
          icon: 'pi pi-building',
          command: () =>
            this.navigateWithToast(
              [ERoute.LAYOUT, ERoute.EXPERIENCE, 'work'],
              'Рабочий опыт'
            ),
        },
      ],
    },
    {
      label: 'Технологии',
      icon: 'pi pi-code',
      items: [
        {
          label: 'Hard Skills',
          items: [
            {
              label: 'Frontend',
              command: () =>
                this.navigateWithToast(
                  [ERoute.LAYOUT, ERoute.TECHNOLOGIES, 'hard', 'frontend'],
                  'Frontend'
                ),
            },
            {
              label: 'Backend',
              command: () =>
                this.navigateWithToast(
                  [ERoute.LAYOUT, ERoute.TECHNOLOGIES, 'hard', 'backend'],
                  'Backend'
                ),
            },
          ],
        },
        {
          label: 'Soft Skills',
          command: () =>
            this.navigateWithToast(
              [ERoute.LAYOUT, ERoute.TECHNOLOGIES, 'soft'],
              'Soft Skills'
            ),
        },
      ],
    },
    {
      label: 'Выйти',
      icon: 'pi pi-sign-out',
      command: () => {
        this.toastEvent.emit({
          severity: 'info',
          summary: 'Signed out',
          detail: 'User logged out',
        });
        this.isNavBarVisible.set(false);
      },
    },
  ];

  private navigateWithToast(route: string[], pageName: string): void {
    const cleanRoute = route.filter((segment) => segment !== ERoute.LAYOUT);

    this.router
      .navigate(cleanRoute, { relativeTo: this.route })
      .then((success) => {
        if (success) {
          this.toastEvent.emit({
            severity: 'success',
            summary: 'Навигация',
            detail: `Вы перешли на страницу: ${pageName}`,
          });
        } else {
          this.toastEvent.emit({
            severity: 'error',
            summary: 'Ошибка',
            detail: `Не удалось перейти на страницу: ${pageName}`,
          });
        }
      })
      .catch((error) => {
        console.error('Navigation error:', error);
        this.toastEvent.emit({
          severity: 'error',
          summary: 'Ошибка навигации',
          detail: `Произошла ошибка при переходе на страницу: ${pageName}`,
        });
      })
      .finally(() => {
        this.isNavBarVisible.set(false);
      });
  }
}
