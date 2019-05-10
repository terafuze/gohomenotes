import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistrationService } from './parent-registration.service';
import { DeleteParentRegistrationPopupComponent } from './delete-parent-registration.component';
import { EditParentRegistrationComponent } from './edit-parent-registration.component';
import { ListParentRegistrationsComponent } from './list-parent-registrations.component';
import { ViewParentRegistrationComponent } from './view-parent-registration.component';

@Injectable({ providedIn: 'root' })
export class ParentRegistrationResolve implements Resolve<IParentRegistration> {
    constructor(private service: ParentRegistrationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((parentRegistration: HttpResponse<ParentRegistration>) => parentRegistration.body));
        }
        return of(new ParentRegistration());
    }
}

export const parentRegistrationRoute: Routes = [
    {
        path: 'family-registrations/:familyRegistrationId/create-parent-registration',
        component: EditParentRegistrationComponent,
        resolve: {
            parentRegistration: ParentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent-registrations',
        component: ListParentRegistrationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent-registrations/:id/view',
        component: ViewParentRegistrationComponent,
        resolve: {
            parentRegistration: ParentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parent-registrations/:id/edit',
        component: EditParentRegistrationComponent,
        resolve: {
            parentRegistration: ParentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentRegistrationPopupRoute: Routes = [
    {
        path: 'parent-registration/:id/delete',
        component: DeleteParentRegistrationPopupComponent,
        resolve: {
            parentRegistration: ParentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];