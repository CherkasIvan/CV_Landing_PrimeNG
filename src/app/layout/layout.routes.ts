import { Routes } from '@angular/router';
import { ERoute } from '../../utils/constants/route.enum';
import { Layout } from './layout';
import { FrontendPage } from './pages/frontend/frontend.page';
import { BackendPage } from './pages/backend/backend.page';
import { SoftPage } from './pages/soft/soft.page';
import { EducationPage } from './pages/education/education.page';
import { WorkPage } from './pages/work/work.page';
import { MainPage } from './pages/main/main.page';
import { ProjectsPage } from './pages/projects/projects.page';
import { LeatherworkingPage } from './pages/leatherworking/leatherworking.page';
import { BracersPage } from './pages/bracers/bracers.page';
import { OtherHandmadePage } from './pages/other-handmade/other-handmade.page';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    children: [
      // Основные маршруты
      {
        path: ERoute.MAIN,
        component: MainPage,
      },

      // Хэндмэйд разделы
      {
        path: ERoute.LEATHERWORKING,
        component: LeatherworkingPage,
        children: [
          { path: ERoute.PROCESS, component: LeatherworkingPage },
          { path: ERoute.TOOLS, component: LeatherworkingPage },
          { path: ERoute.PRODUCTS, component: LeatherworkingPage },
          { path: '', redirectTo: ERoute.PROCESS, pathMatch: 'full' },
        ],
      },
      {
        path: ERoute.BRACERS,
        component: BracersPage,
      },
      {
        path: ERoute.OTHER_HANDMADE,
        component: OtherHandmadePage,
      },

      // Опыт работы и обучение
      {
        path: ERoute.EXPERIENCE,
        children: [
          { path: ERoute.EDUCATION, component: EducationPage },
          { path: ERoute.WORK, component: WorkPage },
          { path: '', redirectTo: ERoute.EDUCATION, pathMatch: 'full' },
        ],
      },

      // Программирование
      {
        path: ERoute.PROJECTS,
        component: ProjectsPage,
      },
      {
        path: ERoute.TECHNOLOGIES,
        children: [
          {
            path: 'hard',
            children: [
              { path: ERoute.FRONTEND, component: FrontendPage },
              { path: ERoute.BACKEND, component: BackendPage },
              { path: '', redirectTo: ERoute.FRONTEND, pathMatch: 'full' },
            ],
          },
          { path: ERoute.SOFT, component: SoftPage },
          { path: '', redirectTo: 'hard', pathMatch: 'full' },
        ],
      },

      { path: '', redirectTo: ERoute.MAIN, pathMatch: 'full' },
    ],
  },
];
