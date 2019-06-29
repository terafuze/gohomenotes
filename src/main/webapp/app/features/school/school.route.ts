import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISchool } from 'app/shared/model/school.model';
import { School } from 'app/shared/model/school.model';
import { SchoolService } from './school.service';
import { DeleteSchoolPopupComponent } from './delete-school.component';
import { EditSchoolComponent } from './edit-school.component';
import { ListSchoolsComponent } from './list-schools.component';
import { ViewSchoolComponent } from './view-school.component';

@Injectable({ providedIn: 'root' })
export class SchoolResolve implements Resolve<ISchool> {
    constructor(private service: SchoolService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchool> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<School>) => response.ok),
                map((school: HttpResponse<School>) => school.body)
            );
        }
        return of(new School());
    }
}

export const schoolRoute: Routes = [
    {
        path: 'school/new',
        component: EditSchoolComponent,
        resolve: {
            school: SchoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schools',
        component: ListSchoolsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schools/:id/view',
        component: ViewSchoolComponent,
        resolve: {
            school: SchoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schools/:id/edit',
        component: EditSchoolComponent,
        resolve: {
            school: SchoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolPopupRoute: Routes = [
    {
        path: 'school/:id/delete',
        component: DeleteSchoolPopupComponent,
        resolve: {
            school: SchoolResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
