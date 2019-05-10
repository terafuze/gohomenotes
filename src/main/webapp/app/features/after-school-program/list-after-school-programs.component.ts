import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';
import { SchoolService } from '../school/school.service';
@Component({
    selector: 'app-list-after-school-programs',
    templateUrl: './list-after-school-programs.component.html'
})
export class ListAfterSchoolProgramsComponent implements OnInit, OnDestroy {
    afterSchoolPrograms: IAfterSchoolProgram[];
    currentAccount: any;
    eventSubscriber: Subscription;
    schoolId: number;
    

    constructor(
        private afterSchoolProgramService: AfterSchoolProgramService,
        private schoolService: SchoolService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.schoolId) {
            this.schoolService.getAfterSchoolPrograms(this.schoolId).subscribe(
                (res: HttpResponse<IAfterSchoolProgram[]>) => {
                    this.afterSchoolPrograms = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.afterSchoolProgramService.query().subscribe(
                (res: HttpResponse<IAfterSchoolProgram[]>) => {
                    this.afterSchoolPrograms = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.schoolId = this.activatedRoute.snapshot.queryParams['schoolId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAfterSchoolPrograms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAfterSchoolProgram) {
        return item.id;
    }

    registerChangeInAfterSchoolPrograms() {
        this.eventSubscriber = this.eventManager.subscribe('afterSchoolProgramListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
