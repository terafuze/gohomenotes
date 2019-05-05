import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteStudentComponent,
    DeleteStudentPopupComponent,
    EditStudentComponent,
    ListStudentsComponent,
    ViewStudentComponent,
    studentRoute,
    studentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteStudentComponent,
        DeleteStudentPopupComponent,
        EditStudentComponent,
        ListStudentsComponent,
        ViewStudentComponent
    ],
    entryComponents: [
        DeleteStudentComponent,
        DeleteStudentPopupComponent,
        EditStudentComponent,
        ListStudentsComponent,
        ViewStudentComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentModule {

}