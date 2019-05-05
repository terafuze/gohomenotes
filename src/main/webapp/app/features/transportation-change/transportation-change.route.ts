import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITransportationChange } from 'app/shared/model/transportation-change.model';
import { TransportationChange } from 'app/shared/model/transportation-change.model';
import { TransportationChangeService } from './transportation-change.service';
import { DeleteTransportationChangePopupComponent } from './delete-transportation-change.component';
import { EditTransportationChangeComponent } from './edit-transportation-change.component';
import { ListTransportationChangesComponent } from './list-transportation-changes.component';
import { ViewTransportationChangeComponent } from './view-transportation-change.component';

@Injectable({ providedIn: 'root' })
export class TransportationChangeResolve implements Resolve<ITransportationChange> {
    constructor(private service: TransportationChangeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transportationChange: HttpResponse<TransportationChange>) => transportationChange.body));
        }
        return of(new TransportationChange());
    }
}

export const transportationChangeRoute: Routes = [
    {
        path: 'transportation-change',
        component: ListTransportationChangesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change/:id/view',
        component: ViewTransportationChangeComponent,
        resolve: {
            transportationChange: TransportationChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change/new',
        component: EditTransportationChangeComponent,
        resolve: {
            transportationChange: TransportationChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transportation-change/:id/edit',
        component: EditTransportationChangeComponent,
        resolve: {
            transportationChange: TransportationChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChange.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transportationChangePopupRoute: Routes = [
    {
        path: 'transportation-change/:id/delete',
        component: DeleteTransportationChangePopupComponent,
        resolve: {
            transportationChange: TransportationChangeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.transportationChange.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];