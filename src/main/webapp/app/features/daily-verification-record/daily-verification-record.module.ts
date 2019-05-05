import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared';
import {
    DeleteDailyVerificationRecordComponent,
    DeleteDailyVerificationRecordPopupComponent,
    EditDailyVerificationRecordComponent,
    ListDailyVerificationRecordsComponent,
    ViewDailyVerificationRecordComponent,
    dailyVerificationRecordRoute,
    dailyVerificationRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...dailyVerificationRecordRoute,
    ...dailyVerificationRecordPopupRoute,
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DeleteDailyVerificationRecordComponent,
        DeleteDailyVerificationRecordPopupComponent,
        EditDailyVerificationRecordComponent,
        ListDailyVerificationRecordsComponent,
        ViewDailyVerificationRecordComponent
    ],
    entryComponents: [
        DeleteDailyVerificationRecordComponent,
        DeleteDailyVerificationRecordPopupComponent,
        EditDailyVerificationRecordComponent,
        ListDailyVerificationRecordsComponent,
        ViewDailyVerificationRecordComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DailyVerificationRecordModule {

}