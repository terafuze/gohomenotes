import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteFamilyComponent,
    DeleteFamilyPopupComponent,
    EditFamilyComponent,
    ListFamiliesComponent,
    ViewFamilyComponent,
    familyRoute,
    familyPopupRoute
} from './';

const ENTITY_STATES = [
    ...familyRoute,
    ...familyPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteFamilyComponent,
        DeleteFamilyPopupComponent,
        EditFamilyComponent,
        ListFamiliesComponent,
        ViewFamilyComponent
    ],
    entryComponents: [
        DeleteFamilyComponent,
        DeleteFamilyPopupComponent,
        EditFamilyComponent,
        ListFamiliesComponent,
        ViewFamilyComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FamilyModule {

}