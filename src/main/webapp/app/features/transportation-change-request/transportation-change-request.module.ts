import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteTransportationChangeRequestComponent,
    DeleteTransportationChangeRequestPopupComponent,
    EditTransportationChangeRequestComponent,
    ListTransportationChangeRequestsComponent,
    ViewTransportationChangeRequestComponent,
    transportationChangeRequestRoute,
    transportationChangeRequestPopupRoute
} from './';

const ENTITY_STATES = [
    ...transportationChangeRequestRoute,
    ...transportationChangeRequestPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteTransportationChangeRequestComponent,
        DeleteTransportationChangeRequestPopupComponent,
        EditTransportationChangeRequestComponent,
        ListTransportationChangeRequestsComponent,
        ViewTransportationChangeRequestComponent
    ],
    entryComponents: [
        DeleteTransportationChangeRequestComponent,
        DeleteTransportationChangeRequestPopupComponent,
        EditTransportationChangeRequestComponent,
        ListTransportationChangeRequestsComponent,
        ViewTransportationChangeRequestComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransportationChangeRequestModule {

}