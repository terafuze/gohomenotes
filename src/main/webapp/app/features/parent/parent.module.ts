import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteParentComponent,
    DeleteParentPopupComponent,
    EditParentComponent,
    ListParentsComponent,
    ViewParentComponent,
    parentRoute,
    parentPopupRoute
} from './';

const ENTITY_STATES = [
    ...parentRoute,
    ...parentPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteParentComponent,
        DeleteParentPopupComponent,
        EditParentComponent,
        ListParentsComponent,
        ViewParentComponent
    ],
    entryComponents: [
        DeleteParentComponent,
        DeleteParentPopupComponent,
        EditParentComponent,
        ListParentsComponent,
        ViewParentComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParentModule {

}