import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';
import { DailyVerificationRecordService } from './daily-verification-record.service';
@Component({
    selector: 'app-list-daily-verification-records',
    templateUrl: './list-daily-verification-records.component.html'
})
export class ListDailyVerificationRecordsComponent implements OnInit, OnDestroy {
    dailyVerificationRecords: IDailyVerificationRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private dailyVerificationRecordService: DailyVerificationRecordService,
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
            this.dailyVerificationRecordService.query().subscribe(
                (res: HttpResponse<IDailyVerificationRecord[]>) => {
                    this.dailyVerificationRecords = res.body;
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
        this.registerChangeInDailyVerificationRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDailyVerificationRecord) {
        return item.id;
    }

    registerChangeInDailyVerificationRecords() {
        this.eventSubscriber = this.eventManager.subscribe('dailyVerificationRecordListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
