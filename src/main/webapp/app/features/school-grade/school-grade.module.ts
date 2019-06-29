import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteSchoolGradeComponent,
    DeleteSchoolGradePopupComponent,
    EditSchoolGradeComponent,
    ListSchoolGradesComponent,
    ViewSchoolGradeComponent,
    schoolGradeRoute,
    schoolGradePopupRoute
} from './';

const ENTITY_STATES = [...schoolGradeRoute, ...schoolGradePopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteSchoolGradeComponent,
        DeleteSchoolGradePopupComponent,
        EditSchoolGradeComponent,
        ListSchoolGradesComponent,
        ViewSchoolGradeComponent
    ],
    entryComponents: [
        DeleteSchoolGradeComponent,
        DeleteSchoolGradePopupComponent,
        EditSchoolGradeComponent,
        ListSchoolGradesComponent,
        ViewSchoolGradeComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolGradeModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
