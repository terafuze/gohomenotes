import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
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
        protected dailyVerificationRecordService: DailyVerificationRecordService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
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
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
