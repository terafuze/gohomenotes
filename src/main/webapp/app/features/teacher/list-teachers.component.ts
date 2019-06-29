import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { SchoolService } from '../school/school.service';

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
        protected teacherService: TeacherService,
        protected schoolService: SchoolService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {}

    loadAll() {
        let dataLoaded = false;
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
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
