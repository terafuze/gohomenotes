import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISchool } from 'app/shared/model/school.model';
import { SchoolService } from './school.service';

@Component({
    selector: 'app-edit-school',
    templateUrl: './edit-school.component.html'
})
export class EditSchoolComponent implements OnInit {
    private _school: ISchool;

    isSaving: boolean;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected schoolService: SchoolService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ school }) => {
            this.school = school;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.school.id !== undefined) {
            this.subscribeToSaveResponse(this.schoolService.update(this.school));
        } else {
            this.subscribeToSaveResponse(this.schoolService.create(this.school));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchool>>) {
        result.subscribe((res: HttpResponse<ISchool>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get school() {
        return this._school;
    }

    set school(school: ISchool) {
        this._school = school;
    }
}
