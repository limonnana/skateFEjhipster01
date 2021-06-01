import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrick, Trick } from 'app/shared/model/trick.model';
import { TrickService } from './trick.service';
import { TrickComponent } from './trick.component';
import { TrickDetailComponent } from './trick-detail.component';
import { TrickUpdateComponent } from './trick-update.component';

@Injectable({ providedIn: 'root' })
export class TrickResolve implements Resolve<ITrick> {
  constructor(private service: TrickService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrick> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((trick: HttpResponse<Trick>) => {
          if (trick.body) {
            return of(trick.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Trick());
  }
}

export const trickRoute: Routes = [
  {
    path: '',
    component: TrickComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tricks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrickDetailComponent,
    resolve: {
      trick: TrickResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tricks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrickUpdateComponent,
    resolve: {
      trick: TrickResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tricks',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrickUpdateComponent,
    resolve: {
      trick: TrickResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Tricks',
    },
    canActivate: [UserRouteAccessService],
  },
];
