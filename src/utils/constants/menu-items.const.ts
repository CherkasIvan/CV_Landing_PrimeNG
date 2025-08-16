import { MenuItem } from 'primeng/api';
import { ERoute } from './route.enum';
import { OutputEmitterRef } from '@angular/core';
import { WritableSignal } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service/firebase.service';
import { Router } from '@angular/router';

interface MenuContext {
  navigateWithToast: (route: string[], pageName: string) => void;
  toastEvent: OutputEmitterRef<any>;
  isNavBarVisible: WritableSignal<boolean>;
  firebaseService: FirebaseService;
  router: Router;
}

export const createMenuItems = (context: MenuContext): MenuItem[] => [
  {
    label: 'Обо мне',
    icon: 'pi pi-user',
    command: () =>
      context.navigateWithToast([ERoute.LAYOUT, ERoute.MAIN], 'Обо мне'),
  },
  {
    label: 'Хэндмэйд',
    icon: 'pi pi-palette',
    items: [
      {
        label: 'Кожевничество',
        icon: 'pi pi-circle-fill',
        items: [
          {
            label: 'Процесс создания',
            icon: 'pi pi-wrench',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.LEATHERWORKING, ERoute.PROCESS],
                'Процесс создания'
              ),
          },
          {
            label: 'Инструменты',
            icon: 'pi pi-tools',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.LEATHERWORKING, ERoute.TOOLS],
                'Инструменты'
              ),
          },
          {
            label: 'Изделия',
            icon: 'pi pi-box',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.LEATHERWORKING, ERoute.PRODUCTS],
                'Изделия'
              ),
          },
        ],
      },
      {
        label: 'Браслеты',
        icon: 'pi pi-shield',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.BRACERS],
            'Браслеты'
          ),
      },
      {
        label: 'Другие хэндмэйд работы',
        icon: 'pi pi-star',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.OTHER_HANDMADE],
            'Другие работы'
          ),
      },
    ],
  },
  {
    label: 'Опыт работы и обучение',
    icon: 'pi pi-briefcase',
    items: [
      {
        label: 'Обучение',
        icon: 'pi pi-book',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.EXPERIENCE_EDUCATION, ERoute.EDUCATION],
            'Обучение'
          ),
      },
      {
        label: 'Места работы',
        icon: 'pi pi-building',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.EXPERIENCE_EDUCATION, ERoute.WORK],
            'Места работы'
          ),
      },
    ],
  },
  {
    label: 'Программирование',
    icon: 'pi pi-code',
    items: [
      {
        label: 'Проекты',
        icon: 'pi pi-folder',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.PROJECTS],
            'Проекты'
          ),
      },
      {
        label: 'Технологии',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Frontend',
            icon: 'pi pi-desktop',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.TECHNOLOGIES, ERoute.FRONTEND],
                'Frontend'
              ),
          },
          {
            label: 'Backend',
            icon: 'pi pi-server',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.TECHNOLOGIES, ERoute.BACKEND],
                'Backend'
              ),
          },
          {
            label: 'Soft Skills',
            icon: 'pi pi-comments',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.TECHNOLOGIES, ERoute.SOFT],
                'Soft Skills'
              ),
          },
        ],
      },
    ],
  },
  {
    label: 'Выйти',
    icon: 'pi pi-sign-out',
    styleClass: 'logout-menu-item',
    command: () => {
      context.firebaseService.signOut().subscribe({
        next: () => {
          localStorage.removeItem('user');
          context.router.navigate([ERoute.AUTH]);
          context.toastEvent.emit({
            severity: 'success',
            summary: 'Выход',
            detail: 'Вы успешно вышли из системы',
          });
          context.isNavBarVisible.set(false);
        },
        error: (err) => {
          console.error('Ошибка выхода:', err);
          context.toastEvent.emit({
            severity: 'error',
            summary: 'Ошибка',
            detail: 'Не удалось выйти из системы',
          });
        },
      });
    },
  },
];
