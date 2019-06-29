import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteStudentRegistrationComponent,
    DeleteStudentRegistrationPopupComponent,
    EditStudentRegistrationComponent,
    ListStudentRegistrationsComponent,
    ViewStudentRegistrationComponent,
    studentRegistrationRoute,
    studentRegistrationPopupRoute
} from './';

const ENTITY_STATES = [...studentRegistrationRoute, ...studentRegistrationPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteStudentRegistrationComponent,
        DeleteStudentRegistrationPopupComponent,
        EditStudentRegistrationComponent,
        ListStudentRegistrationsComponent,
        ViewStudentRegistrationComponent
    ],
    entryComponents: [
        DeleteStudentRegistrationComponent,
        DeleteStudentRegistrationPopupComponent,
        EditStudentRegistrationComponent,
        ListStudentRegistrationsComponent,
        ViewStudentRegistrationComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentRegistrationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
