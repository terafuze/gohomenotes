import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SharedModule } from 'app/shared';
import {
  DeleteGoHomeNotesReportComponent,
  DeleteGoHomeNotesReportPopupComponent,
  EditGoHomeNotesReportComponent,
  ListGoHomeNotesReportsComponent,
  ViewGoHomeNotesReportComponent,
  goHomeNotesReportRoute,
  goHomeNotesReportPopupRoute
} from './';

const ENTITY_STATES = [...goHomeNotesReportRoute, ...goHomeNotesReportPopupRoute];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DeleteGoHomeNotesReportComponent,
    DeleteGoHomeNotesReportPopupComponent,
    EditGoHomeNotesReportComponent,
    ListGoHomeNotesReportsComponent,
    ViewGoHomeNotesReportComponent
  ],
  entryComponents: [
    DeleteGoHomeNotesReportComponent,
    DeleteGoHomeNotesReportPopupComponent,
    EditGoHomeNotesReportComponent,
    ListGoHomeNotesReportsComponent,
    ViewGoHomeNotesReportComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GoHomeNotesReportModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
