import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';
import { DeleteTransportationChangeRequestPopupComponent } from './delete-transportation-change-request.component';
import { EditTransportationChangeRequestComponent } from './edit-transportation-change-request.component';
import { ListTransportationChangeRequestsComponent } from './list-transportation-change-requests.component';
import { ViewTransportationChangeRequestComponent } from './view-transportation-change-request.component';

@Injectable({ providedIn: 'root' })
export class TransportationChangeRequestResolve implements Resolve<ITransportationChangeRequest> {
    constructor(private service: TransportationChangeRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportationChangeRequest: HttpResponse<TransportationChangeRequest>) => transportationChangeRequest.body));
        }
        return of(new TransportationChangeRequest());
    }
}

export const transportationChangeRequestRoute: Routes = [
    {
        path: 'transportation-change-request/new',
        component: EditTransportationChangeRequestComponent,
        resolve: {
            transportationChangeRequest: TransportationChangeRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChangeRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change-requests',
        component: ListTransportationChangeRequestsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChangeRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change-requests/:id/view',
        component: ViewTransportationChangeRequestComponent,
        resolve: {
            transportationChangeRequest: TransportationChangeRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChangeRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change-requests/:id/edit',
        component: EditTransportationChangeRequestComponent,
        resolve: {
            transportationChangeRequest: TransportationChangeRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChangeRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportationChangeRequestPopupRoute: Routes = [
    {
        path: 'transportation-change-request/:id/delete',
        component: DeleteTransportationChangeRequestPopupComponent,
        resolve: {
            transportationChangeRequest: TransportationChangeRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChangeRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];