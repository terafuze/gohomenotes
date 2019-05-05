import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteLegalGuardianComponent,
    DeleteLegalGuardianPopupComponent,
    EditLegalGuardianComponent,
    ListLegalGuardiansComponent,
    ViewLegalGuardianComponent,
    legalGuardianRoute,
    legalGuardianPopupRoute,
} from './';

const ENTITY_STATES = [
    ...legalGuardianRoute,
    ...legalGuardianPopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteLegalGuardianComponent,
        DeleteLegalGuardianPopupComponent,
        EditLegalGuardianComponent,
        ListLegalGuardiansComponent,
        ViewLegalGuardianComponent
    ],
    entryComponents: [
        DeleteLegalGuardianComponent,
        DeleteLegalGuardianPopupComponent,
        EditLegalGuardianComponent,
        ListLegalGuardiansComponent,
        ViewLegalGuardianComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LegalGuardianModule {

}