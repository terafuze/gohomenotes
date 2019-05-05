import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';

@Component({
    selector: 'app-view-daily-verification-record',
    templateUrl: './view-daily-verification-record.component.html'
})
export class ViewDailyVerificationRecordComponent implements OnInit {

    dailyVerificationRecord: IDailyVerificationRecord;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dailyVerificationRecord }) => {
            this.dailyVerificationRecord = dailyVerificationRecord;
        });
    }

    previousState() {
        window.history.back();
    }
}