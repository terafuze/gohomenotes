import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteParentRegistrationComponent,
    DeleteParentRegistrationPopupComponent,
    EditParentRegistrationComponent,
    ListParentRegistrationsComponent,
    ViewParentRegistrationComponent,
    parentRegistrationRoute,
    parentRegistrationPopupRoute
} from './';

const ENTITY_STATES = [...parentRegistrationRoute, ...parentRegistrationPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteParentRegistrationComponent,
        DeleteParentRegistrationPopupComponent,
        EditParentRegistrationComponent,
        ListParentRegistrationsComponent,
        ViewParentRegistrationComponent
    ],
    entryComponents: [
        DeleteParentRegistrationComponent,
        DeleteParentRegistrationPopupComponent,
        EditParentRegistrationComponent,
        ListParentRegistrationsComponent,
        ViewParentRegistrationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParentRegistrationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
