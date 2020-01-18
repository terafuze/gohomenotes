import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
  DeleteSchoolComponent,
  DeleteSchoolPopupComponent,
  EditSchoolComponent,
  ListSchoolsComponent,
  ViewSchoolComponent,
  schoolRoute,
  schoolPopupRoute
} from './';

const ENTITY_STATES = [...schoolRoute, ...schoolPopupRoute];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DeleteSchoolComponent, DeleteSchoolPopupComponent, EditSchoolComponent, ListSchoolsComponent, ViewSchoolComponent],
  entryComponents: [DeleteSchoolComponent, DeleteSchoolPopupComponent, EditSchoolComponent, ListSchoolsComponent, ViewSchoolComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
