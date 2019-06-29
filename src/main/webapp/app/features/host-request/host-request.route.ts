import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IHostRequest } from 'app/shared/model/host-request.model';
import { HostRequest } from 'app/shared/model/host-request.model';
import { HostRequestService } from './host-request.service';
import { DeleteHostRequestPopupComponent } from './delete-host-request.component';
import { EditHostRequestComponent } from './edit-host-request.component';
import { ListHostRequestsComponent } from './list-host-requests.component';
import { ViewHostRequestComponent } from './view-host-request.component';

@Injectable({ providedIn: 'root' })
export class HostRequestResolve implements Resolve<IHostRequest> {
    constructor(private service: HostRequestService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHostRequest> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<HostRequest>) => response.ok),
                map((hostRequest: HttpResponse<HostRequest>) => hostRequest.body)
            );
        }
        return of(new HostRequest());
    }
}

export const hostRequestRoute: Routes = [
    {
        path: 'host-request/new',
        component: EditHostRequestComponent,
        resolve: {
            hostRequest: HostRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.hostRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'host-requests',
        component: ListHostRequestsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.hostRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'host-requests/:id/view',
        component: ViewHostRequestComponent,
        resolve: {
            hostRequest: HostRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.hostRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'host-requests/:id/edit',
        component: EditHostRequestComponent,
        resolve: {
            hostRequest: HostRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.hostRequest.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hostRequestPopupRoute: Routes = [
    {
        path: 'host-request/:id/delete',
        component: DeleteHostRequestPopupComponent,
        resolve: {
            hostRequest: HostRequestResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.hostRequest.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
