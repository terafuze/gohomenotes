import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteDismissalLocationComponent,
    DeleteDismissalLocationPopupComponent,
    EditDismissalLocationComponent,
    ListDismissalLocationsComponent,
    ViewDismissalLocationComponent,
    dismissalLocationRoute,
    dismissalLocationPopupRoute
} from './';

const ENTITY_STATES = [
    ...dismissalLocationRoute,
    ...dismissalLocationPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteDismissalLocationComponent,
        DeleteDismissalLocationPopupComponent,
        EditDismissalLocationComponent,
        ListDismissalLocationsComponent,
        ViewDismissalLocationComponent
    ],
    entryComponents: [
        DeleteDismissalLocationComponent,
        DeleteDismissalLocationPopupComponent,
        EditDismissalLocationComponent,
        ListDismissalLocationsComponent,
        ViewDismissalLocationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DismissalLocationModule {

}