import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IStudent } from 'app/shared/model/student.model';
import { Student } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { DeleteStudentPopupComponent } from './delete-student.component';
import { EditStudentComponent } from './edit-student.component';
import { ListStudentsComponent } from './list-students.component';
import { ViewStudentComponent } from './view-student.component';

@Injectable({ providedIn: 'root' })
export class StudentResolve implements Resolve<IStudent> {
    constructor(private service: StudentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudent> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Student>) => response.ok),
                map((student: HttpResponse<Student>) => student.body)
            );
        }
        return of(new Student());
    }
}

export const studentRoute: Routes = [
    {
        path: 'parents/:parentId/create-student',
        component: EditStudentComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'students',
        component: ListStudentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'students/:id/view',
        component: ViewStudentComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'students/:id/edit',
        component: EditStudentComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student/:id/delete',
        component: DeleteStudentPopupComponent,
        resolve: {
            student: StudentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
