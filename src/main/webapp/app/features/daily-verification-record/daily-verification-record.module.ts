import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteDailyVerificationRecordComponent,
    DeleteDailyVerificationRecordPopupComponent,
    EditDailyVerificationRecordComponent,
    ListDailyVerificationRecordsComponent,
    ViewDailyVerificationRecordComponent,
    dailyVerificationRecordRoute,
    dailyVerificationRecordPopupRoute
} from './';

const ENTITY_STATES = [...dailyVerificationRecordRoute, ...dailyVerificationRecordPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DailyVerificationRecordModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
