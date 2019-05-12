import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { SchoolGradeService } from './school-grade.service';
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
        private schoolGradeService: SchoolGradeService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
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
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
