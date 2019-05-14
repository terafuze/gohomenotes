import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

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

    // The list of School Grade from which to select
    schoolGrades: ISchoolGrade[];
    // The list of User Profile from which to select
    userProfiles: IUserProfile[];
    
    schoolId: number;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private schoolGradeService: SchoolGradeService,
        private userProfileService: UserProfileService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.schoolGradeService.query().subscribe(
            (res: HttpResponse<ISchoolGrade[]>) => {
                this.schoolGrades = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
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
