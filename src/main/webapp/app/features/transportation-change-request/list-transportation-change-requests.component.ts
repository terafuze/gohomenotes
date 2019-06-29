import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';

@Component({
    selector: 'app-list-transportation-change-requests',
    templateUrl: './list-transportation-change-requests.component.html'
})
export class ListTransportationChangeRequestsComponent implements OnInit, OnDestroy {
    transportationChangeRequests: ITransportationChangeRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected transportationChangeRequestService: TransportationChangeRequestService,
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
            this.transportationChangeRequestService.query().subscribe(
                (res: HttpResponse<ITransportationChangeRequest[]>) => {
                    this.transportationChangeRequests = res.body;
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
        this.registerChangeInTransportationChangeRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportationChangeRequest) {
        return item.id;
    }

    registerChangeInTransportationChangeRequests() {
        this.eventSubscriber = this.eventManager.subscribe('transportationChangeRequestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
