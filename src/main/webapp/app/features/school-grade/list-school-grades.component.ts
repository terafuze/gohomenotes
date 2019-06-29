import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from './school-grade.service';
import { SchoolService } from '../school/school.service';

@Component({
    selector: 'app-list-school-grades',
    templateUrl: './list-school-grades.component.html'
})
export class ListSchoolGradesComponent implements OnInit, OnDestroy {
    schoolGrades: ISchoolGrade[];
    currentAccount: any;
    eventSubscriber: Subscription;
    schoolId: number;

    constructor(
        protected schoolGradeService: SchoolGradeService,
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
        if (this.schoolId) {
            this.schoolService.getSchoolGrades(this.schoolId).subscribe(
                (res: HttpResponse<ISchoolGrade[]>) => {
                    this.schoolGrades = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.schoolGradeService.query().subscribe(
                (res: HttpResponse<ISchoolGrade[]>) => {
                    this.schoolGrades = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSchoolGrades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISchoolGrade) {
        return item.id;
    }

    registerChangeInSchoolGrades() {
        this.eventSubscriber = this.eventManager.subscribe('schoolGradeListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
