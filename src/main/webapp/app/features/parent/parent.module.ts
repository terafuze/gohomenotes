import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteParentComponent,
    DeleteParentPopupComponent,
    EditParentComponent,
    ListParentsComponent,
    ViewParentComponent,
    parentRoute,
    parentPopupRoute
} from './';

const ENTITY_STATES = [...parentRoute, ...parentPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DeleteParentComponent, DeleteParentPopupComponent, EditParentComponent, ListParentsComponent, ViewParentComponent],
    entryComponents: [DeleteParentComponent, DeleteParentPopupComponent, EditParentComponent, ListParentsComponent, ViewParentComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ParentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
