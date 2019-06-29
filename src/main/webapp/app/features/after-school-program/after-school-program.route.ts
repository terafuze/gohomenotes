import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';
import { DeleteAfterSchoolProgramPopupComponent } from './delete-after-school-program.component';
import { EditAfterSchoolProgramComponent } from './edit-after-school-program.component';
import { ListAfterSchoolProgramsComponent } from './list-after-school-programs.component';
import { ViewAfterSchoolProgramComponent } from './view-after-school-program.component';

@Injectable({ providedIn: 'root' })
export class AfterSchoolProgramResolve implements Resolve<IAfterSchoolProgram> {
    constructor(private service: AfterSchoolProgramService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAfterSchoolProgram> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AfterSchoolProgram>) => response.ok),
                map((afterSchoolProgram: HttpResponse<AfterSchoolProgram>) => afterSchoolProgram.body)
            );
        }
        return of(new AfterSchoolProgram());
    }
}

export const afterSchoolProgramRoute: Routes = [
    {
        path: 'schools/:schoolId/create-after-school-program',
        component: EditAfterSchoolProgramComponent,
        resolve: {
            afterSchoolProgram: AfterSchoolProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.afterSchoolProgram.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'after-school-programs',
        component: ListAfterSchoolProgramsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.afterSchoolProgram.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'after-school-programs/:id/view',
        component: ViewAfterSchoolProgramComponent,
        resolve: {
            afterSchoolProgram: AfterSchoolProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.afterSchoolProgram.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'after-school-programs/:id/edit',
        component: EditAfterSchoolProgramComponent,
        resolve: {
            afterSchoolProgram: AfterSchoolProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.afterSchoolProgram.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const afterSchoolProgramPopupRoute: Routes = [
    {
        path: 'after-school-program/:id/delete',
        component: DeleteAfterSchoolProgramPopupComponent,
        resolve: {
            afterSchoolProgram: AfterSchoolProgramResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.afterSchoolProgram.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
