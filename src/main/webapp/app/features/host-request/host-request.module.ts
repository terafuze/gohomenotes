import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteHostRequestComponent,
    DeleteHostRequestPopupComponent,
    EditHostRequestComponent,
    ListHostRequestsComponent,
    ViewHostRequestComponent,
    hostRequestRoute,
    hostRequestPopupRoute
} from './';

const ENTITY_STATES = [...hostRequestRoute, ...hostRequestPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteHostRequestComponent,
        DeleteHostRequestPopupComponent,
        EditHostRequestComponent,
        ListHostRequestsComponent,
        ViewHostRequestComponent
    ],
    entryComponents: [
        DeleteHostRequestComponent,
        DeleteHostRequestPopupComponent,
        EditHostRequestComponent,
        ListHostRequestsComponent,
        ViewHostRequestComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HostRequestModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
