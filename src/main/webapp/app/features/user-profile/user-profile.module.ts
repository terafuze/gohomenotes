import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteUserProfileComponent,
    DeleteUserProfilePopupComponent,
    EditUserProfileComponent,
    ListUserProfilesComponent,
    ViewUserProfileComponent,
    userProfileRoute,
    userProfilePopupRoute
} from './';

const ENTITY_STATES = [...userProfileRoute, ...userProfilePopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeleteUserProfileComponent,
        DeleteUserProfilePopupComponent,
        EditUserProfileComponent,
        ListUserProfilesComponent,
        ViewUserProfileComponent
    ],
    entryComponents: [
        DeleteUserProfileComponent,
        DeleteUserProfilePopupComponent,
        EditUserProfileComponent,
        ListUserProfilesComponent,
        ViewUserProfileComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfileModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
