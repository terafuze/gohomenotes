import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';

@Component({
    selector: 'app-edit-after-school-program',
    templateUrl: './edit-after-school-program.component.html'
})
export class EditAfterSchoolProgramComponent implements OnInit {
    private _afterSchoolProgram: IAfterSchoolProgram;

    isSaving: boolean;

    schoolId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected afterSchoolProgramService: AfterSchoolProgramService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ afterSchoolProgram }) => {
            this.afterSchoolProgram = afterSchoolProgram;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.afterSchoolProgram.id !== undefined) {
            this.subscribeToSaveResponse(this.afterSchoolProgramService.update(this.afterSchoolProgram));
        } else {
            this.afterSchoolProgram.schoolId = this.schoolId;
            this.subscribeToSaveResponse(this.afterSchoolProgramService.create(this.afterSchoolProgram));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAfterSchoolProgram>>) {
        result.subscribe((res: HttpResponse<IAfterSchoolProgram>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get afterSchoolProgram() {
        return this._afterSchoolProgram;
    }

    set afterSchoolProgram(afterSchoolProgram: IAfterSchoolProgram) {
        this._afterSchoolProgram = afterSchoolProgram;
    }
}
