import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteEarlyPickupRequestComponent,
    DeleteEarlyPickupRequestPopupComponent,
    EditEarlyPickupRequestComponent,
    ListEarlyPickupRequestsComponent,
    ViewEarlyPickupRequestComponent,
    earlyPickupRequestRoute,
    earlyPickupRequestPopupRoute
} from './';

const ENTITY_STATES = [
    ...earlyPickupRequestRoute,
    ...earlyPickupRequestPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteEarlyPickupRequestComponent,
        DeleteEarlyPickupRequestPopupComponent,
        EditEarlyPickupRequestComponent,
        ListEarlyPickupRequestsComponent,
        ViewEarlyPickupRequestComponent
    ],
    entryComponents: [
        DeleteEarlyPickupRequestComponent,
        DeleteEarlyPickupRequestPopupComponent,
        EditEarlyPickupRequestComponent,
        ListEarlyPickupRequestsComponent,
        ViewEarlyPickupRequestComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EarlyPickupRequestModule {

}