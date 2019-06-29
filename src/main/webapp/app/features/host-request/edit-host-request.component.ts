import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHostRequest } from 'app/shared/model/host-request.model';
import { HostRequestService } from './host-request.service';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-host-request',
    templateUrl: './edit-host-request.component.html'
})
export class EditHostRequestComponent implements OnInit {
    private _hostRequest: IHostRequest;

    isSaving: boolean;

    // The list of Students from which to select
    students: IStudent[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected studentService: StudentService,
        protected hostRequestService: HostRequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ hostRequest }) => {
            this.hostRequest = hostRequest;
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
        if (this.hostRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.hostRequestService.update(this.hostRequest));
        } else {
            this.subscribeToSaveResponse(this.hostRequestService.create(this.hostRequest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IHostRequest>>) {
        result.subscribe((res: HttpResponse<IHostRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get hostRequest() {
        return this._hostRequest;
    }

    set hostRequest(hostRequest: IHostRequest) {
        this._hostRequest = hostRequest;
    }
}
