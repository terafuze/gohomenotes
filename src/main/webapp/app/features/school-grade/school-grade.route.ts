import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from './school-grade.service';
import { DeleteSchoolGradePopupComponent } from './delete-school-grade.component';
import { EditSchoolGradeComponent } from './edit-school-grade.component';
import { ListSchoolGradesComponent } from './list-school-grades.component';
import { ViewSchoolGradeComponent } from './view-school-grade.component';

@Injectable({ providedIn: 'root' })
export class SchoolGradeResolve implements Resolve<ISchoolGrade> {
    constructor(private service: SchoolGradeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((schoolGrade: HttpResponse<SchoolGrade>) => schoolGrade.body));
        }
        return of(new SchoolGrade());
    }
}

export const schoolGradeRoute: Routes = [
    {
        path: 'schools/:schoolId/create-school-grade',
        component: EditSchoolGradeComponent,
        resolve: {
            schoolGrade: SchoolGradeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.schoolGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-grades',
        component: ListSchoolGradesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.schoolGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-grades/:id/view',
        component: ViewSchoolGradeComponent,
        resolve: {
            schoolGrade: SchoolGradeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.schoolGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'school-grades/:id/edit',
        component: EditSchoolGradeComponent,
        resolve: {
            schoolGrade: SchoolGradeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.schoolGrade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolGradePopupRoute: Routes = [
    {
        path: 'school-grade/:id/delete',
        component: DeleteSchoolGradePopupComponent,
        resolve: {
            schoolGrade: SchoolGradeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.schoolGrade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];