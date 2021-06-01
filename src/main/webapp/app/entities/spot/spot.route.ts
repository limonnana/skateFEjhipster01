import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpot, Spot } from 'app/shared/model/spot.model';
import { SpotService } from './spot.service';
import { SpotComponent } from './spot.component';
import { SpotDetailComponent } from './spot-detail.component';
import { SpotUpdateComponent } from './spot-update.component';
import { AddImageToSpotComponent } from './add-image-to-spot/add-image-to-spot.component';

@Injectable({ providedIn: 'root' })
export class SpotResolve implements Resolve<ISpot> {
  constructor(private service: SpotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((spot: HttpResponse<Spot>) => {
          if (spot.body) {
            return of(spot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Spot());
  }
}

export const spotRoute: Routes = [
  {
    path: '',
    component: SpotComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Spots',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SpotDetailComponent,
    resolve: {
      spot: SpotResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Spots',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpotUpdateComponent,
    resolve: {
      spot: SpotResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Spots',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpotUpdateComponent,
    resolve: {
      spot: SpotResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Spots',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/addImageToSpot',
    component: AddImageToSpotComponent,
    resolve: {
      spot: SpotResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Spots',
    },
    canActivate: [UserRouteAccessService],
  },
];
