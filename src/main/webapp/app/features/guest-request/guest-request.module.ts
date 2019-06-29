import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteGuestRequestComponent,
    DeleteGuestRequestPopupComponent,
    EditGuestRequestComponent,
    ListGuestRequestsComponent,
    ViewGuestRequestComponent,
    guestRequestRoute,
    guestRequestPopupRoute
} from './';

const ENTITY_STATES = [...guestRequestRoute, ...guestRequestPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GuestRequestModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
