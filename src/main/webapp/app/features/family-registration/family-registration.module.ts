import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteFamilyRegistrationComponent,
    DeleteFamilyRegistrationPopupComponent,
    EditFamilyRegistrationComponent,
    ListFamilyRegistrationsComponent,
    ViewFamilyRegistrationComponent,
    familyRegistrationRoute,
    familyRegistrationPopupRoute
} from './';

const ENTITY_STATES = [...familyRegistrationRoute, ...familyRegistrationPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteFamilyRegistrationComponent,
        DeleteFamilyRegistrationPopupComponent,
        EditFamilyRegistrationComponent,
        ListFamilyRegistrationsComponent,
        ViewFamilyRegistrationComponent
    ],
    entryComponents: [
        DeleteFamilyRegistrationComponent,
        DeleteFamilyRegistrationPopupComponent,
        EditFamilyRegistrationComponent,
        ListFamilyRegistrationsComponent,
        ViewFamilyRegistrationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FamilyRegistrationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
