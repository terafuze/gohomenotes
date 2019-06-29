import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';

import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/features/parent';
import { ISchool } from 'app/shared/model/school.model';
import { SchoolService } from 'app/features/school';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from 'app/features/school-grade';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/features/teacher';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {
    private _student: IStudent;

    isSaving: boolean;

    parentId: number;

    // The list of Parents from which to select
    parents: IParent[];
    // The list of Schools from which to select
    schools: ISchool[];
    // The list of School Grades from which to select
    schoolGrades: ISchoolGrade[];
    // The list of Teachers from which to select
    teachers: ITeacher[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected parentService: ParentService,
        protected schoolService: SchoolService,
        protected schoolGradeService: SchoolGradeService,
        protected teacherService: TeacherService,
        protected studentService: StudentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.parentId = this.activatedRoute.snapshot.params['parentId'];
        console.log('Parent ID: ${this.parentId}');
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
        this.parentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParent[]>) => response.body)
            )
            .subscribe((res: IParent[]) => (this.parents = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchool[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchool[]>) => response.body)
            )
            .subscribe((res: ISchool[]) => (this.schools = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolGradeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISchoolGrade[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISchoolGrade[]>) => response.body)
            )
            .subscribe((res: ISchoolGrade[]) => (this.schoolGrades = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.teacherService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeacher[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeacher[]>) => response.body)
            )
            .subscribe((res: ITeacher[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(this.studentService.update(this.student));
        } else {
            this.student.parentId = this.parentId;
            console.log('Parent ID: ${this.parentId}');
            this.subscribeToSaveResponse(this.studentService.create(this.student));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>) {
        result.subscribe((res: HttpResponse<IStudent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackParentById(index: number, item: IParent) {
        return item.id;
    }

    trackSchoolById(index: number, item: ISchool) {
        return item.id;
    }

    trackSchoolGradeById(index: number, item: ISchoolGrade) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacher) {
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

    get student() {
        return this._student;
    }

    set student(student: IStudent) {
        this._student = student;
    }
}
