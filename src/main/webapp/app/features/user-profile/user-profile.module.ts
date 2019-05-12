import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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

const ENTITY_STATES = [
    ...userProfileRoute,
    ...userProfilePopupRoute
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfileModule {

}