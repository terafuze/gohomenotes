import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IParent } from 'app/shared/model/parent.model';
import { Parent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';
import { DeleteParentPopupComponent } from './delete-parent.component';
import { EditParentComponent } from './edit-parent.component';
import { ListParentsComponent } from './list-parents.component';
import { ViewParentComponent } from './view-parent.component';

@Injectable({ providedIn: 'root' })
export class ParentResolve implements Resolve<IParent> {
    constructor(private service: ParentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Parent>) => response.ok),
                map((parent: HttpResponse<Parent>) => parent.body)
            );
        }
        return of(new Parent());
    }
}

export const parentRoute: Routes = [
    {
        path: 'parent/new',
        component: EditParentComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parents',
        component: ListParentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parents/:id/view',
        component: ViewParentComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'parents/:id/edit',
        component: EditParentComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentPopupRoute: Routes = [
    {
        path: 'parent/:id/delete',
        component: DeleteParentPopupComponent,
        resolve: {
            parent: ParentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.parent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
