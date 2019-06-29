import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from 'app/features/dismissal-location';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-transportation-change-request',
    templateUrl: './edit-transportation-change-request.component.html'
})
export class EditTransportationChangeRequestComponent implements OnInit {
    private _transportationChangeRequest: ITransportationChangeRequest;

    isSaving: boolean;

    // The list of Dismissal Locations from which to select
    dismissalLocations: IDismissalLocation[];
    // The list of Students from which to select
    students: IStudent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected dismissalLocationService: DismissalLocationService,
        protected studentService: StudentService,
        protected transportationChangeRequestService: TransportationChangeRequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ transportationChangeRequest }) => {
            this.transportationChangeRequest = transportationChangeRequest;
        });
        this.dismissalLocationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDismissalLocation[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDismissalLocation[]>) => response.body)
            )
            .subscribe(
                (res: IDismissalLocation[]) => (this.dismissalLocations = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
        if (this.transportationChangeRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.transportationChangeRequestService.update(this.transportationChangeRequest));
        } else {
            this.subscribeToSaveResponse(this.transportationChangeRequestService.create(this.transportationChangeRequest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportationChangeRequest>>) {
        result.subscribe(
            (res: HttpResponse<ITransportationChangeRequest>) => this.onSaveSuccess(),
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

    trackDismissalLocationById(index: number, item: IDismissalLocation) {
        return item.id;
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

    get transportationChangeRequest() {
        return this._transportationChangeRequest;
    }

    set transportationChangeRequest(transportationChangeRequest: ITransportationChangeRequest) {
        this._transportationChangeRequest = transportationChangeRequest;
    }
}
