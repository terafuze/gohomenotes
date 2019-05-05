import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILegalGuardian } from 'app/shared/model/legal-guardian.model';
import { LegalGuardian } from 'app/shared/model/legal-guardian.model';
import { LegalGuardianService } from './legal-guardian.service';
import { DeleteLegalGuardianPopupComponent } from './delete-legal-guardian.component';
import { EditLegalGuardianComponent } from './edit-legal-guardian.component';
import { ListLegalGuardiansComponent } from './list-legal-guardians.component';
import { ViewLegalGuardianComponent } from './view-legal-guardian.component';

@Injectable({ providedIn: 'root' })
export class LegalGuardianResolve implements Resolve<ILegalGuardian> {
    constructor(private service: LegalGuardianService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((legalGuardian: HttpResponse<LegalGuardian>) => legalGuardian.body));
        }
        return of(new LegalGuardian());
    }
}

export const legalGuardianRoute: Routes = [
    {
        path: 'legal-guardian',
        component: ListLegalGuardiansComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.legalGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-guardian/:id/view',
        component: ViewLegalGuardianComponent,
        resolve: {
            legalGuardian: LegalGuardianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.legalGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-guardian/new',
        component: EditLegalGuardianComponent,
        resolve: {
            legalGuardian: LegalGuardianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.legalGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'legal-guardian/:id/edit',
        component: EditLegalGuardianComponent,
        resolve: {
            legalGuardian: LegalGuardianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.legalGuardian.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const legalGuardianPopupRoute: Routes = [
    {
        path: 'legal-guardian/:id/delete',
        component: DeleteLegalGuardianPopupComponent,
        resolve: {
            legalGuardian: LegalGuardianResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.legalGuardian.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];