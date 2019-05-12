import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteStudentRegistrationComponent,
    DeleteStudentRegistrationPopupComponent,
    EditStudentRegistrationComponent,
    ListStudentRegistrationsComponent,
    ViewStudentRegistrationComponent,
    studentRegistrationRoute,
    studentRegistrationPopupRoute
} from './';

const ENTITY_STATES = [
    ...studentRegistrationRoute,
    ...studentRegistrationPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteStudentRegistrationComponent,
        DeleteStudentRegistrationPopupComponent,
        EditStudentRegistrationComponent,
        ListStudentRegistrationsComponent,
        ViewStudentRegistrationComponent
    ],
    entryComponents: [
        DeleteStudentRegistrationComponent,
        DeleteStudentRegistrationPopupComponent,
        EditStudentRegistrationComponent,
        ListStudentRegistrationsComponent,
        ViewStudentRegistrationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentRegistrationModule {

}