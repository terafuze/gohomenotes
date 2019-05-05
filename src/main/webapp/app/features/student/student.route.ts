import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((student: HttpResponse<Student>) => student.body));
        }
        return of(new Student());
    }
}

export const studentRoute: Routes = [
    {
        path: 'student',
        component: ListStudentsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schools/:schoolId/students/:id/view',
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
        path: 'schools/:schoolId/create-student',
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
        path: 'schools/:schoolId/students/:id/edit',
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