import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteSchoolGradeComponent,
    DeleteSchoolGradePopupComponent,
    EditSchoolGradeComponent,
    ListSchoolGradesComponent,
    ViewSchoolGradeComponent,
    schoolGradeRoute,
    schoolGradePopupRoute,
} from './';

const ENTITY_STATES = [
    ...schoolGradeRoute,
    ...schoolGradePopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteSchoolGradeComponent,
        DeleteSchoolGradePopupComponent,
        EditSchoolGradeComponent,
        ListSchoolGradesComponent,
        ViewSchoolGradeComponent
    ],
    entryComponents: [
        DeleteSchoolGradeComponent,
        DeleteSchoolGradePopupComponent,
        EditSchoolGradeComponent,
        ListSchoolGradesComponent,
        ViewSchoolGradeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolGradeModule {

}