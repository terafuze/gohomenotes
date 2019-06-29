import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequestService } from './early-pickup-request.service';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-early-pickup-request',
    templateUrl: './edit-early-pickup-request.component.html'
})
export class EditEarlyPickupRequestComponent implements OnInit {
    private _earlyPickupRequest: IEarlyPickupRequest;

    isSaving: boolean;

    // The list of Students from which to select
    students: IStudent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected studentService: StudentService,
        protected earlyPickupRequestService: EarlyPickupRequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ earlyPickupRequest }) => {
            this.earlyPickupRequest = earlyPickupRequest;
        });
        this.studentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStudent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStudent[]>) => response.body)
            )
            .subscribe((res: IStudent[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.earlyPickupRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.earlyPickupRequestService.update(this.earlyPickupRequest));
        } else {
            this.subscribeToSaveResponse(this.earlyPickupRequestService.create(this.earlyPickupRequest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEarlyPickupRequest>>) {
        result.subscribe((res: HttpResponse<IEarlyPickupRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackStudentById(index: number, item: IStudent) {
        return item.id;
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

    get earlyPickupRequest() {
        return this._earlyPickupRequest;
    }

    set earlyPickupRequest(earlyPickupRequest: IEarlyPickupRequest) {
        this._earlyPickupRequest = earlyPickupRequest;
    }
}
