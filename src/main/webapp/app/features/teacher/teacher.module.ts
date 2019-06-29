import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteTeacherComponent,
    DeleteTeacherPopupComponent,
    EditTeacherComponent,
    ListTeachersComponent,
    ViewTeacherComponent,
    teacherRoute,
    teacherPopupRoute
} from './';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DeleteTeacherComponent, DeleteTeacherPopupComponent, EditTeacherComponent, ListTeachersComponent, ViewTeacherComponent],
    entryComponents: [
        DeleteTeacherComponent,
        DeleteTeacherPopupComponent,
        EditTeacherComponent,
        ListTeachersComponent,
        ViewTeacherComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeacherModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
