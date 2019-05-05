import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGuestRequest } from 'app/shared/model/guest-request.model';
import { GuestRequest } from 'app/shared/model/guest-request.model';
import { GuestRequestService } from './guest-request.service';
import { DeleteGuestRequestPopupComponent } from './delete-guest-request.component';
import { EditGuestRequestComponent } from './edit-guest-request.component';
import { ListGuestRequestsComponent } from './list-guest-requests.component';
import { ViewGuestRequestComponent } from './view-guest-request.component';

@Injectable({ providedIn: 'root' })
export class GuestRequestResolve implements Resolve<IGuestRequest> {
    constructor(private service: GuestRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((guestRequest: HttpResponse<GuestRequest>) => guestRequest.body));
        }
        return of(new GuestRequest());
    }
}

export const guestRequestRoute: Routes = [
    {
        path: 'guest-request',
        component: ListGuestRequestsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.guestRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'guest-request/:id/view',
        component: ViewGuestRequestComponent,
        resolve: {
            guestRequest: GuestRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.guestRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'guest-request/new',
        component: EditGuestRequestComponent,
        resolve: {
            guestRequest: GuestRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.guestRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'guest-request/:id/edit',
        component: EditGuestRequestComponent,
        resolve: {
            guestRequest: GuestRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.guestRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const guestRequestPopupRoute: Routes = [
    {
        path: 'guest-request/:id/delete',
        component: DeleteGuestRequestPopupComponent,
        resolve: {
            guestRequest: GuestRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.guestRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];