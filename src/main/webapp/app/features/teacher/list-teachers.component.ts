import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { SchoolGradeService } from '../school-grade/school-grade.service';
import { UserProfileService } from '../user-profile/user-profile.service';
@Component({
    selector: 'app-list-teachers',
    templateUrl: './list-teachers.component.html'
})
export class ListTeachersComponent implements OnInit, OnDestroy {
    teachers: ITeacher[];
    currentAccount: any;
    eventSubscriber: Subscription;
    schoolId: number;
    schoolGradeId: number;
    userProfileId: number;
    

    constructor(
        private teacherService: TeacherService,
        private schoolGradeService: SchoolGradeService,
        private userProfileService: UserProfileService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.schoolGradeId) {
            this.schoolGradeService.getTeachers(this.schoolGradeId).subscribe(
                (res: HttpResponse<ITeacher[]>) => {
                    this.teachers = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }

        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.teacherService.query().subscribe(
                (res: HttpResponse<ITeacher[]>) => {
                    this.teachers = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.schoolGradeId = this.activatedRoute.snapshot.queryParams['schoolGradeId'];
        this.userProfileId = this.activatedRoute.snapshot.queryParams['userProfileId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTeachers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITeacher) {
        return item.id;
    }

    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe('teacherListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
