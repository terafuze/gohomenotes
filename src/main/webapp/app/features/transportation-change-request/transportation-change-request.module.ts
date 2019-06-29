import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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

const ENTITY_STATES = [...transportationChangeRequestRoute, ...transportationChangeRequestPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransportationChangeRequestModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
