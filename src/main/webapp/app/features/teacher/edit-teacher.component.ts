import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';

import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from 'app/features/school-grade';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from 'app/features/user-profile';

@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html'
})
export class EditTeacherComponent implements OnInit {
    private _teacher: ITeacher;

    isSaving: boolean;

    // The list of School Grades from which to select
    schoolGrades: ISchoolGrade[];
    // The list of User Profiles from which to select
    userProfiles: IUserProfile[];

    schoolId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected schoolGradeService: SchoolGradeService,
        protected userProfileService: UserProfileService,
        protected teacherService: TeacherService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.schoolGradeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchoolGrade[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchoolGrade[]>) => response.body)
            )
            .subscribe((res: ISchoolGrade[]) => (this.schoolGrades = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.teacher.schoolId = this.schoolId;
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSchoolGradeById(index: number, item: ISchoolGrade) {
        return item.id;
    }

    trackUserProfileById(index: number, item: IUserProfile) {
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

    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacher) {
        this._teacher = teacher;
    }
}
