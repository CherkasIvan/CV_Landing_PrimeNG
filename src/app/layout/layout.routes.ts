import { Routes } from '@angular/router';
import { ERoute } from '../../utils/constants/route.enum';
import { Layout } from './layout';
import { FrontendPage } from './pages/frontend/frontend.page';
import { BackendPage } from './pages/backend/backend.page';
import { SoftPage } from './pages/soft/soft.page';
import { EducationPage } from './pages/education/education.page';
import { WorkPage } from './pages/work/work.page';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: ERoute.MAIN,
        loadComponent: () =>
          import('./pages/main/main.page').then((c) => c.MainPage),
      },
      {
        path: ERoute.PROJECTS,
        loadComponent: () =>
          import('./pages/projects/projects.page').then((c) => c.ProjectsPage),
      },
      {
        path: ERoute.EXPERIENCE,
        loadComponent: () =>
          import('./pages/experience/experience.page').then(
            (c) => c.ExperiencePage
          ),
        children: [
          {
            path: '',
            children: [
              { path: 'education', component: EducationPage },
              { path: 'work', component: WorkPage },
            ],
          },
        ],
      },
      {
        path: ERoute.TECHNOLOGIES,
        loadComponent: () =>
          import('./pages/technologies/technologies.page').then(
            (c) => c.TechnologiesPage
          ),
        children: [
          {
            path: 'hard',
            children: [
              { path: 'frontend', component: FrontendPage },
              { path: 'backend', component: BackendPage },
            ],
          },
          {
            path: 'soft',
            component: SoftPage,
          },
        ],
      },
      {
        path: '',
        redirectTo: ERoute.MAIN,
        pathMatch: 'full',
      },
    ],
  },
];
