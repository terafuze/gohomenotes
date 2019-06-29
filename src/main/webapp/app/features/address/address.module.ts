import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
    DeleteAddressComponent,
    DeleteAddressPopupComponent,
    EditAddressComponent,
    ListAddressesComponent,
    ViewAddressComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DeleteAddressComponent, DeleteAddressPopupComponent, EditAddressComponent, ListAddressesComponent, ViewAddressComponent],
    entryComponents: [
        DeleteAddressComponent,
        DeleteAddressPopupComponent,
        EditAddressComponent,
        ListAddressesComponent,
        ViewAddressComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddressModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
