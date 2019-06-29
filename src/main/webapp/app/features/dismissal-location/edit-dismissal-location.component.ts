import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';

@Component({
    selector: 'app-edit-dismissal-location',
    templateUrl: './edit-dismissal-location.component.html'
})
export class EditDismissalLocationComponent implements OnInit {
    private _dismissalLocation: IDismissalLocation;

    isSaving: boolean;

    schoolId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected dismissalLocationService: DismissalLocationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ dismissalLocation }) => {
            this.dismissalLocation = dismissalLocation;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.dismissalLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.dismissalLocationService.update(this.dismissalLocation));
        } else {
            this.dismissalLocation.schoolId = this.schoolId;
            this.subscribeToSaveResponse(this.dismissalLocationService.create(this.dismissalLocation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDismissalLocation>>) {
        result.subscribe((res: HttpResponse<IDismissalLocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get dismissalLocation() {
        return this._dismissalLocation;
    }

    set dismissalLocation(dismissalLocation: IDismissalLocation) {
        this._dismissalLocation = dismissalLocation;
    }
}
