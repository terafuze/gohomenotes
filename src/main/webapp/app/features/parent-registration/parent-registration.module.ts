import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteParentRegistrationComponent,
    DeleteParentRegistrationPopupComponent,
    EditParentRegistrationComponent,
    ListParentRegistrationsComponent,
    ViewParentRegistrationComponent,
    parentRegistrationRoute,
    parentRegistrationPopupRoute
} from './';

const ENTITY_STATES = [
    ...parentRegistrationRoute,
    ...parentRegistrationPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteParentRegistrationComponent,
        DeleteParentRegistrationPopupComponent,
        EditParentRegistrationComponent,
        ListParentRegistrationsComponent,
        ViewParentRegistrationComponent
    ],
    entryComponents: [
        DeleteParentRegistrationComponent,
        DeleteParentRegistrationPopupComponent,
        EditParentRegistrationComponent,
        ListParentRegistrationsComponent,
        ViewParentRegistrationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParentRegistrationModule {

}