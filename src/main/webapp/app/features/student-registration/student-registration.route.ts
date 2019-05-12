import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from './student-registration.service';
import { DeleteStudentRegistrationPopupComponent } from './delete-student-registration.component';
import { EditStudentRegistrationComponent } from './edit-student-registration.component';
import { ListStudentRegistrationsComponent } from './list-student-registrations.component';
import { ViewStudentRegistrationComponent } from './view-student-registration.component';

@Injectable({ providedIn: 'root' })
export class StudentRegistrationResolve implements Resolve<IStudentRegistration> {
    constructor(private service: StudentRegistrationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((studentRegistration: HttpResponse<StudentRegistration>) => studentRegistration.body));
        }
        return of(new StudentRegistration());
    }
}

export const studentRegistrationRoute: Routes = [
    {
        path: 'family-registrations/:familyRegistrationId/create-student-registration',
        component: EditStudentRegistrationComponent,
        resolve: {
            studentRegistration: StudentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.studentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-registrations',
        component: ListStudentRegistrationsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.studentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-registrations/:id/view',
        component: ViewStudentRegistrationComponent,
        resolve: {
            studentRegistration: StudentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.studentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'student-registrations/:id/edit',
        component: EditStudentRegistrationComponent,
        resolve: {
            studentRegistration: StudentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.studentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentRegistrationPopupRoute: Routes = [
    {
        path: 'student-registration/:id/delete',
        component: DeleteStudentRegistrationPopupComponent,
        resolve: {
            studentRegistration: StudentRegistrationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.studentRegistration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];