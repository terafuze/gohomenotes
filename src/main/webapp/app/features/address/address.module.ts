import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteAddressComponent,
    DeleteAddressPopupComponent,
    EditAddressComponent,
    ListAddressesComponent,
    ViewAddressComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteAddressComponent,
        DeleteAddressPopupComponent,
        EditAddressComponent,
        ListAddressesComponent,
        ViewAddressComponent
    ],
    entryComponents: [
        DeleteAddressComponent,
        DeleteAddressPopupComponent,
        EditAddressComponent,
        ListAddressesComponent,
        ViewAddressComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddressModule {

}