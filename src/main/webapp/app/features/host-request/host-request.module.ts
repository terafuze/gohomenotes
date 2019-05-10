import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteHostRequestComponent,
    DeleteHostRequestPopupComponent,
    EditHostRequestComponent,
    ListHostRequestsComponent,
    ViewHostRequestComponent,
    hostRequestRoute,
    hostRequestPopupRoute
} from './';

const ENTITY_STATES = [
    ...hostRequestRoute,
    ...hostRequestPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteHostRequestComponent,
        DeleteHostRequestPopupComponent,
        EditHostRequestComponent,
        ListHostRequestsComponent,
        ViewHostRequestComponent
    ],
    entryComponents: [
        DeleteHostRequestComponent,
        DeleteHostRequestPopupComponent,
        EditHostRequestComponent,
        ListHostRequestsComponent,
        ViewHostRequestComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HostRequestModule {

}