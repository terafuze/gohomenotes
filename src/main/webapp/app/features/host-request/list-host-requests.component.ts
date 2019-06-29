import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IHostRequest } from 'app/shared/model/host-request.model';
import { HostRequestService } from './host-request.service';
@Component({
    selector: 'app-list-host-requests',
    templateUrl: './list-host-requests.component.html'
})
export class ListHostRequestsComponent implements OnInit, OnDestroy {
    hostRequests: IHostRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected hostRequestService: HostRequestService,
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
            this.hostRequestService.query().subscribe(
                (res: HttpResponse<IHostRequest[]>) => {
                    this.hostRequests = res.body;
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
        this.registerChangeInHostRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IHostRequest) {
        return item.id;
    }

    registerChangeInHostRequests() {
        this.eventSubscriber = this.eventManager.subscribe('hostRequestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
