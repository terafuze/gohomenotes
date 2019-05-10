import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteAfterSchoolProgramComponent,
    DeleteAfterSchoolProgramPopupComponent,
    EditAfterSchoolProgramComponent,
    ListAfterSchoolProgramsComponent,
    ViewAfterSchoolProgramComponent,
    afterSchoolProgramRoute,
    afterSchoolProgramPopupRoute
} from './';

const ENTITY_STATES = [
    ...afterSchoolProgramRoute,
    ...afterSchoolProgramPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteAfterSchoolProgramComponent,
        DeleteAfterSchoolProgramPopupComponent,
        EditAfterSchoolProgramComponent,
        ListAfterSchoolProgramsComponent,
        ViewAfterSchoolProgramComponent
    ],
    entryComponents: [
        DeleteAfterSchoolProgramComponent,
        DeleteAfterSchoolProgramPopupComponent,
        EditAfterSchoolProgramComponent,
        ListAfterSchoolProgramsComponent,
        ViewAfterSchoolProgramComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AfterSchoolProgramModule {

}