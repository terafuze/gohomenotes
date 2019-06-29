import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

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

const ENTITY_STATES = [...dismissalLocationRoute, ...dismissalLocationPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
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
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DismissalLocationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
