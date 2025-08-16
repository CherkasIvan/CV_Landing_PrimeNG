import { Routes } from '@angular/router';
import { ERoute } from '../../utils/constants/route.enum';
import { BackendPage } from './pages/backend/backend.page';
import { BracersPage } from './pages/bracers/bracers.page';
import { EducationPage } from './pages/education/education.page';
import { ExperienceEducationPage } from './pages/experience-education/experience-education.page';
import { FrontendPage } from './pages/frontend/frontend.page';
import { LeatherworkingPage } from './pages/leatherworking/leatherworking.page';
import { MainPage } from './pages/main/main.page';
import { OtherHandmadePage } from './pages/other-handmade/other-handmade.page';
import { ProjectsPage } from './pages/projects/projects.page';
import { SoftPage } from './pages/soft/soft.page';
import { TechnologiesPage } from './pages/technologies/technologies.page';
import { WorkPage } from './pages/work/work.page';
import { ProcessPage } from './pages/process/process.page';
import { ToolsPage } from './pages/tools/tools.page';
import { ProductsPage } from './pages/products/products.page';

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
          { path: ERoute.PROCESS, component: ProcessPage },
          { path: ERoute.TOOLS, component: ToolsPage },
          { path: ERoute.PRODUCTS, component: ProductsPage },
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
        path: ERoute.EXPERIENCE_EDUCATION,
        component: ExperienceEducationPage,
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
        component: TechnologiesPage,
        children: [
          { path: ERoute.FRONTEND, component: FrontendPage },
          { path: ERoute.BACKEND, component: BackendPage },
          { path: ERoute.SOFT, component: SoftPage },
          { path: '', redirectTo: ERoute.HARD, pathMatch: 'full' },
        ],
      },

      { path: '', redirectTo: ERoute.MAIN, pathMatch: 'full' },
    ],
  },
];
