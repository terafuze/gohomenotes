import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IFamily } from 'app/shared/model/family.model';
import { Family } from 'app/shared/model/family.model';
import { FamilyService } from './family.service';
import { DeleteFamilyPopupComponent } from './delete-family.component';
import { EditFamilyComponent } from './edit-family.component';
import { ListFamiliesComponent } from './list-families.component';
import { ViewFamilyComponent } from './view-family.component';

@Injectable({ providedIn: 'root' })
export class FamilyResolve implements Resolve<IFamily> {
    constructor(private service: FamilyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((family: HttpResponse<Family>) => family.body));
        }
        return of(new Family());
    }
}

export const familyRoute: Routes = [
    {
        path: 'family/new',
        component: EditFamilyComponent,
        resolve: {
            family: FamilyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'families',
        component: ListFamiliesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'families/:id/view',
        component: ViewFamilyComponent,
        resolve: {
            family: FamilyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'families/:id/edit',
        component: EditFamilyComponent,
        resolve: {
            family: FamilyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.family.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const familyPopupRoute: Routes = [
    {
        path: 'family/:id/delete',
        component: DeleteFamilyPopupComponent,
        resolve: {
            family: FamilyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.family.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];