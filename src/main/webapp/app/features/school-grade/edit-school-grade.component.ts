import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from './school-grade.service';

@Component({
    selector: 'app-edit-school-grade',
    templateUrl: './edit-school-grade.component.html'
})
export class EditSchoolGradeComponent implements OnInit {
    private _schoolGrade: ISchoolGrade;

    isSaving: boolean;

    schoolId: number;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private schoolGradeService: SchoolGradeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ schoolGrade }) => {
            this.schoolGrade = schoolGrade;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.schoolGrade.id !== undefined) {
            this.subscribeToSaveResponse(this.schoolGradeService.update(this.schoolGrade));
        } else {
            this.schoolGrade.schoolId = this.schoolId;
            this.subscribeToSaveResponse(this.schoolGradeService.create(this.schoolGrade));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchoolGrade>>) {
        result.subscribe((res: HttpResponse<ISchoolGrade>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get schoolGrade() {
        return this._schoolGrade;
    }

    set schoolGrade(schoolGrade: ISchoolGrade) {
        this._schoolGrade = schoolGrade;
    }
}
