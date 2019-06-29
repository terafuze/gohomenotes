import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';
import { DailyVerificationRecordService } from './daily-verification-record.service';

@Component({
    selector: 'app-edit-daily-verification-record',
    templateUrl: './edit-daily-verification-record.component.html'
})
export class EditDailyVerificationRecordComponent implements OnInit {
    private _dailyVerificationRecord: IDailyVerificationRecord;

    isSaving: boolean;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected dailyVerificationRecordService: DailyVerificationRecordService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ dailyVerificationRecord }) => {
            this.dailyVerificationRecord = dailyVerificationRecord;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dailyVerificationRecord.id !== undefined) {
            this.subscribeToSaveResponse(this.dailyVerificationRecordService.update(this.dailyVerificationRecord));
        } else {
            this.subscribeToSaveResponse(this.dailyVerificationRecordService.create(this.dailyVerificationRecord));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDailyVerificationRecord>>) {
        result.subscribe(
            (res: HttpResponse<IDailyVerificationRecord>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    get dailyVerificationRecord() {
        return this._dailyVerificationRecord;
    }

    set dailyVerificationRecord(dailyVerificationRecord: IDailyVerificationRecord) {
        this._dailyVerificationRecord = dailyVerificationRecord;
    }
}
