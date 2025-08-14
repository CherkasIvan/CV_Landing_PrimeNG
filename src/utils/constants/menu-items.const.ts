import { MenuItem } from 'primeng/api';
import { ERoute } from './route.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OutputEmitterRef } from '@angular/core';
import { WritableSignal } from '@angular/core';

interface MenuContext {
  navigateWithToast: (route: string[], pageName: string) => void;
  toastEvent: OutputEmitterRef<any>;
  isNavBarVisible: WritableSignal<boolean>;
}

// Фабричная функция для создания пунктов меню
export const createMenuItems = (context: MenuContext): MenuItem[] => [
  {
    label: 'Главная',
    icon: 'pi pi-home',
    command: () =>
      context.navigateWithToast([ERoute.LAYOUT, ERoute.MAIN], 'Главная'),
  },
  {
    label: 'Проекты',
    icon: 'pi pi-folder',
    command: () =>
      context.navigateWithToast([ERoute.LAYOUT, ERoute.PROJECTS], 'Проекты'),
  },
  {
    label: 'Опыт',
    icon: 'pi pi-briefcase',
    items: [
      {
        label: 'Обучение',
        icon: 'pi pi-book',
        command: () =>
          context.navigateWithToast(
            [ERoute.LAYOUT, ERoute.EXPERIENCE, 'education'],
            'Обучение'
          ),
      },
      {
        label: 'Рабочий опыт',
        icon: 'pi pi-building',
        command: () =>
          context.navigateWithToast(
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
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.TECHNOLOGIES, 'hard', 'frontend'],
                'Frontend'
              ),
          },
          {
            label: 'Backend',
            command: () =>
              context.navigateWithToast(
                [ERoute.LAYOUT, ERoute.TECHNOLOGIES, 'hard', 'backend'],
                'Backend'
              ),
          },
        ],
      },
      {
        label: 'Soft Skills',
        command: () =>
          context.navigateWithToast(
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
      context.toastEvent.emit({
        severity: 'info',
        summary: 'Signed out',
        detail: 'User logged out',
      });
      context.isNavBarVisible.set(false);
    },
  },
];
