import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteFamilyRegistrationComponent,
    DeleteFamilyRegistrationPopupComponent,
    EditFamilyRegistrationComponent,
    ListFamilyRegistrationsComponent,
    ViewFamilyRegistrationComponent,
    familyRegistrationRoute,
    familyRegistrationPopupRoute
} from './';

const ENTITY_STATES = [
    ...familyRegistrationRoute,
    ...familyRegistrationPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteFamilyRegistrationComponent,
        DeleteFamilyRegistrationPopupComponent,
        EditFamilyRegistrationComponent,
        ListFamilyRegistrationsComponent,
        ViewFamilyRegistrationComponent
    ],
    entryComponents: [
        DeleteFamilyRegistrationComponent,
        DeleteFamilyRegistrationPopupComponent,
        EditFamilyRegistrationComponent,
        ListFamilyRegistrationsComponent,
        ViewFamilyRegistrationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FamilyRegistrationModule {

}