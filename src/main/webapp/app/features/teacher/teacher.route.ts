import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITeacher } from 'app/shared/model/teacher.model';
import { Teacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { DeleteTeacherPopupComponent } from './delete-teacher.component';
import { EditTeacherComponent } from './edit-teacher.component';
import { ListTeachersComponent } from './list-teachers.component';
import { ViewTeacherComponent } from './view-teacher.component';

@Injectable({ providedIn: 'root' })
export class TeacherResolve implements Resolve<ITeacher> {
    constructor(private service: TeacherService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((teacher: HttpResponse<Teacher>) => teacher.body));
        }
        return of(new Teacher());
    }
}

export const teacherRoute: Routes = [
    {
        path: 'schools/:schoolId/create-teacher',
        component: EditTeacherComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teachers',
        component: ListTeachersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teachers/:id/view',
        component: ViewTeacherComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'teachers/:id/edit',
        component: EditTeacherComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.teacher.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teacherPopupRoute: Routes = [
    {
        path: 'teacher/:id/delete',
        component: DeleteTeacherPopupComponent,
        resolve: {
            teacher: TeacherResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.teacher.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];