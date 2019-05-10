import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { ISchool } from 'app/shared/model/school.model';
import { SchoolService } from './school.service';
@Component({
    selector: 'app-list-schools',
    templateUrl: './list-schools.component.html'
})
export class ListSchoolsComponent implements OnInit, OnDestroy {
    schools: ISchool[];
    currentAccount: any;
    eventSubscriber: Subscription;
    afterSchoolProgramId: number;
    dismissalLocationId: number;
    schoolGradeId: number;
    studentId: number;
    teacherId: number;
    

    constructor(
        private schoolService: SchoolService,
        private afterSchoolProgramService: AfterSchoolProgramService,
        private dismissalLocationService: DismissalLocationService,
        private schoolGradeService: SchoolGradeService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.afterSchoolProgramId) {
            this.afterSchoolProgramService.getSchools(this.afterSchoolProgramId).subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.dismissalLocationId) {
            this.dismissalLocationService.getSchools(this.dismissalLocationId).subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.schoolGradeId) {
            this.schoolGradeService.getSchools(this.schoolGradeId).subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.studentId) {
            this.studentService.getSchools(this.studentId).subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.teacherId) {
            this.teacherService.getSchools(this.teacherId).subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.schoolService.query().subscribe(
                (res: HttpResponse<ISchool[]>) => {
                    this.schools = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.afterSchoolProgramId = this.activatedRoute.snapshot.queryParams['afterSchoolProgramId'];
        this.dismissalLocationId = this.activatedRoute.snapshot.queryParams['dismissalLocationId'];
        this.schoolGradeId = this.activatedRoute.snapshot.queryParams['schoolGradeId'];
        this.studentId = this.activatedRoute.snapshot.queryParams['studentId'];
        this.teacherId = this.activatedRoute.snapshot.queryParams['teacherId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSchools();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISchool) {
        return item.id;
    }

    registerChangeInSchools() {
        this.eventSubscriber = this.eventManager.subscribe('schoolListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
