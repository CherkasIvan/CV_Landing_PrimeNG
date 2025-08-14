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
    children: [
      {
        path: ERoute.MAIN,
        loadComponent: () =>
          import('./pages/main/main.page').then((m) => m.MainPage),
      },
      {
        path: ERoute.PROJECTS,
        loadComponent: () =>
          import('./pages/projects/projects.page').then((m) => m.ProjectsPage),
      },
      {
        path: ERoute.EXPERIENCE,
        loadComponent: () =>
          import('./pages/experience/experience.page').then(
            (m) => m.ExperiencePage
          ),
        children: [
          { path: 'education', component: EducationPage },
          { path: 'work', component: WorkPage },
          { path: '', redirectTo: 'education', pathMatch: 'full' },
        ],
      },
      {
        path: ERoute.TECHNOLOGIES,
        loadComponent: () =>
          import('./pages/technologies/technologies.page').then(
            (m) => m.TechnologiesPage
          ),
        children: [
          {
            path: 'hard',
            children: [
              { path: 'frontend', component: FrontendPage },
              { path: 'backend', component: BackendPage },
              { path: '', redirectTo: 'frontend', pathMatch: 'full' },
            ],
          },
          { path: 'soft', component: SoftPage },
          { path: '', redirectTo: 'hard', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: ERoute.MAIN, pathMatch: 'full' },
    ],
  },
];
