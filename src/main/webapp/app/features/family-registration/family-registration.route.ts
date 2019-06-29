import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistrationService } from './family-registration.service';
import { DeleteFamilyRegistrationPopupComponent } from './delete-family-registration.component';
import { EditFamilyRegistrationComponent } from './edit-family-registration.component';
import { ListFamilyRegistrationsComponent } from './list-family-registrations.component';
import { ViewFamilyRegistrationComponent } from './view-family-registration.component';

@Injectable({ providedIn: 'root' })
export class FamilyRegistrationResolve implements Resolve<IFamilyRegistration> {
    constructor(private service: FamilyRegistrationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFamilyRegistration> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FamilyRegistration>) => response.ok),
                map((familyRegistration: HttpResponse<FamilyRegistration>) => familyRegistration.body)
            );
        }
        return of(new FamilyRegistration());
    }
}

export const familyRegistrationRoute: Routes = [
    {
        path: 'family-registration/new',
        component: EditFamilyRegistrationComponent,
        resolve: {
            familyRegistration: FamilyRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.familyRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-registrations',
        component: ListFamilyRegistrationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.familyRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-registrations/:id/view',
        component: ViewFamilyRegistrationComponent,
        resolve: {
            familyRegistration: FamilyRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.familyRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'family-registrations/:id/edit',
        component: EditFamilyRegistrationComponent,
        resolve: {
            familyRegistration: FamilyRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.familyRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyRegistrationPopupRoute: Routes = [
    {
        path: 'family-registration/:id/delete',
        component: DeleteFamilyRegistrationPopupComponent,
        resolve: {
            familyRegistration: FamilyRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.familyRegistration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
