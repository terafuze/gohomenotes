import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequestService } from './early-pickup-request.service';
import { DeleteEarlyPickupRequestPopupComponent } from './delete-early-pickup-request.component';
import { EditEarlyPickupRequestComponent } from './edit-early-pickup-request.component';
import { ListEarlyPickupRequestsComponent } from './list-early-pickup-requests.component';
import { ViewEarlyPickupRequestComponent } from './view-early-pickup-request.component';

@Injectable({ providedIn: 'root' })
export class EarlyPickupRequestResolve implements Resolve<IEarlyPickupRequest> {
    constructor(private service: EarlyPickupRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEarlyPickupRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<EarlyPickupRequest>) => response.ok),
                map((earlyPickupRequest: HttpResponse<EarlyPickupRequest>) => earlyPickupRequest.body)
            );
        }
        return of(new EarlyPickupRequest());
    }
}

export const earlyPickupRequestRoute: Routes = [
    {
        path: 'early-pickup-request/new',
        component: EditEarlyPickupRequestComponent,
        resolve: {
            earlyPickupRequest: EarlyPickupRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.earlyPickupRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'early-pickup-requests',
        component: ListEarlyPickupRequestsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.earlyPickupRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'early-pickup-requests/:id/view',
        component: ViewEarlyPickupRequestComponent,
        resolve: {
            earlyPickupRequest: EarlyPickupRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.earlyPickupRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'early-pickup-requests/:id/edit',
        component: EditEarlyPickupRequestComponent,
        resolve: {
            earlyPickupRequest: EarlyPickupRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.earlyPickupRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const earlyPickupRequestPopupRoute: Routes = [
    {
        path: 'early-pickup-request/:id/delete',
        component: DeleteEarlyPickupRequestPopupComponent,
        resolve: {
            earlyPickupRequest: EarlyPickupRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.earlyPickupRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
