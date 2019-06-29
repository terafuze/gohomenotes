import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequestService } from './early-pickup-request.service';

@Component({
    selector: 'app-list-early-pickup-requests',
    templateUrl: './list-early-pickup-requests.component.html'
})
export class ListEarlyPickupRequestsComponent implements OnInit, OnDestroy {
    earlyPickupRequests: IEarlyPickupRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected earlyPickupRequestService: EarlyPickupRequestService,
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
            this.earlyPickupRequestService.query().subscribe(
                (res: HttpResponse<IEarlyPickupRequest[]>) => {
                    this.earlyPickupRequests = res.body;
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
        this.registerChangeInEarlyPickupRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEarlyPickupRequest) {
        return item.id;
    }

    registerChangeInEarlyPickupRequests() {
        this.eventSubscriber = this.eventManager.subscribe('earlyPickupRequestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
