import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteTransportationChangeComponent,
    DeleteTransportationChangePopupComponent,
    EditTransportationChangeComponent,
    ListTransportationChangesComponent,
    ViewTransportationChangeComponent,
    transportationChangeRoute,
    transportationChangePopupRoute,
} from './';

const ENTITY_STATES = [
    ...transportationChangeRoute,
    ...transportationChangePopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteTransportationChangeComponent,
        DeleteTransportationChangePopupComponent,
        EditTransportationChangeComponent,
        ListTransportationChangesComponent,
        ViewTransportationChangeComponent
    ],
    entryComponents: [
        DeleteTransportationChangeComponent,
        DeleteTransportationChangePopupComponent,
        EditTransportationChangeComponent,
        ListTransportationChangesComponent,
        ViewTransportationChangeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransportationChangeModule {

}