import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { SchoolService } from '../school/school.service';
import { SchoolGradeService } from '../school-grade/school-grade.service';
import { TeacherService } from '../teacher/teacher.service';
@Component({
    selector: 'app-list-students',
    templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit, OnDestroy {
    students: IStudent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    schoolId: number;
    schoolGradeId: number;
    teacherId: number;
    

    constructor(
        private studentService: StudentService,
        private schoolService: SchoolService,
        private schoolGradeService: SchoolGradeService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.schoolId) {
            this.schoolService.getStudents(this.schoolId).subscribe(
                (res: HttpResponse<IStudent[]>) => {
                    this.students = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.schoolGradeId) {
            this.schoolGradeService.getStudents(this.schoolGradeId).subscribe(
                (res: HttpResponse<IStudent[]>) => {
                    this.students = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.teacherId) {
            this.teacherService.getStudents(this.teacherId).subscribe(
                (res: HttpResponse<IStudent[]>) => {
                    this.students = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.studentService.query().subscribe(
                (res: HttpResponse<IStudent[]>) => {
                    this.students = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.schoolId = this.activatedRoute.snapshot.queryParams['schoolId'];
        this.schoolGradeId = this.activatedRoute.snapshot.queryParams['schoolGradeId'];
        this.teacherId = this.activatedRoute.snapshot.queryParams['teacherId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudent) {
        return item.id;
    }

    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe('studentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
