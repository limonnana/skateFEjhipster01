import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ContributionComponent } from './contribution/contribution.component';

import { HomeComponent } from './home.component';
import { StartComponent } from './start/start.component';

export const HOME_ROUTE: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'Welcome, Sean!',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new-contribution',
    component: ContributionComponent,
    data: {
      authorities: [],
      pageTitle: 'New Contribution !',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: '',
    component: StartComponent,
    data: {
      authorities: [],
      pageTitle: 'Welcome Sean !',
    },
  },
];
