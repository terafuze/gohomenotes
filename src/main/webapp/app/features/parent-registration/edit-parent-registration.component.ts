import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistrationService } from './parent-registration.service';

@Component({
    selector: 'app-edit-parent-registration',
    templateUrl: './edit-parent-registration.component.html'
})
export class EditParentRegistrationComponent implements OnInit {
    private _parentRegistration: IParentRegistration;

    isSaving: boolean;

    familyRegistrationId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected parentRegistrationService: ParentRegistrationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.familyRegistrationId = this.activatedRoute.snapshot.params['familyRegistrationId'];
        this.activatedRoute.data.subscribe(({ parentRegistration }) => {
            this.parentRegistration = parentRegistration;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.parentRegistration.id !== undefined) {
            this.subscribeToSaveResponse(this.parentRegistrationService.update(this.parentRegistration));
        } else {
            this.parentRegistration.familyRegistrationId = this.familyRegistrationId;
            this.subscribeToSaveResponse(this.parentRegistrationService.create(this.parentRegistration));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IParentRegistration>>) {
        result.subscribe((res: HttpResponse<IParentRegistration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get parentRegistration() {
        return this._parentRegistration;
    }

    set parentRegistration(parentRegistration: IParentRegistration) {
        this._parentRegistration = parentRegistration;
    }
}
