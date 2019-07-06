import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';
import { GoHomeNotesReportService } from './go-home-notes-report.service';

@Component({
  selector: 'app-edit-go-home-notes-report',
  templateUrl: './edit-go-home-notes-report.component.html'
})
export class EditGoHomeNotesReportComponent implements OnInit {
  private _goHomeNotesReport: IGoHomeNotesReport;

  isSaving: boolean;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jhiDataUtils: JhiDataUtils,
    protected goHomeNotesReportService: GoHomeNotesReportService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ goHomeNotesReport }) => {
      this.goHomeNotesReport = goHomeNotesReport;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.goHomeNotesReport.id !== undefined) {
      this.subscribeToSaveResponse(this.goHomeNotesReportService.update(this.goHomeNotesReport));
    } else {
      this.subscribeToSaveResponse(this.goHomeNotesReportService.create(this.goHomeNotesReport));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGoHomeNotesReport>>) {
    result.subscribe((res: HttpResponse<IGoHomeNotesReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  // TODO if not needed, remove this function
  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  // TODO remove the following three methods if this page does not include file upload capabitilies
  // File Upload related methods
  byteSize(field) {
    return this.jhiDataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.jhiDataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.jhiDataUtils.setFileData(event, entity, field, isImage);
  }

  get goHomeNotesReport() {
    return this._goHomeNotesReport;
  }

  set goHomeNotesReport(goHomeNotesReport: IGoHomeNotesReport) {
    this._goHomeNotesReport = goHomeNotesReport;
  }
}
