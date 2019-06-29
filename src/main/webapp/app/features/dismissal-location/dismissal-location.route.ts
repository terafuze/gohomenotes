import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';
import { DeleteDismissalLocationPopupComponent } from './delete-dismissal-location.component';
import { EditDismissalLocationComponent } from './edit-dismissal-location.component';
import { ListDismissalLocationsComponent } from './list-dismissal-locations.component';
import { ViewDismissalLocationComponent } from './view-dismissal-location.component';

@Injectable({ providedIn: 'root' })
export class DismissalLocationResolve implements Resolve<IDismissalLocation> {
    constructor(private service: DismissalLocationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDismissalLocation> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DismissalLocation>) => response.ok),
                map((dismissalLocation: HttpResponse<DismissalLocation>) => dismissalLocation.body)
            );
        }
        return of(new DismissalLocation());
    }
}

export const dismissalLocationRoute: Routes = [
    {
        path: 'schools/:schoolId/create-dismissal-location',
        component: EditDismissalLocationComponent,
        resolve: {
            dismissalLocation: DismissalLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dismissalLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dismissal-locations',
        component: ListDismissalLocationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dismissalLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dismissal-locations/:id/view',
        component: ViewDismissalLocationComponent,
        resolve: {
            dismissalLocation: DismissalLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dismissalLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'dismissal-locations/:id/edit',
        component: EditDismissalLocationComponent,
        resolve: {
            dismissalLocation: DismissalLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dismissalLocation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dismissalLocationPopupRoute: Routes = [
    {
        path: 'dismissal-location/:id/delete',
        component: DeleteDismissalLocationPopupComponent,
        resolve: {
            dismissalLocation: DismissalLocationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dismissalLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
