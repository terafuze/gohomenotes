import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteGuestRequestComponent,
    DeleteGuestRequestPopupComponent,
    EditGuestRequestComponent,
    ListGuestRequestsComponent,
    ViewGuestRequestComponent,
    guestRequestRoute,
    guestRequestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...guestRequestRoute,
    ...guestRequestPopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteGuestRequestComponent,
        DeleteGuestRequestPopupComponent,
        EditGuestRequestComponent,
        ListGuestRequestsComponent,
        ViewGuestRequestComponent
    ],
    entryComponents: [
        DeleteGuestRequestComponent,
        DeleteGuestRequestPopupComponent,
        EditGuestRequestComponent,
        ListGuestRequestsComponent,
        ViewGuestRequestComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuestRequestModule {

}