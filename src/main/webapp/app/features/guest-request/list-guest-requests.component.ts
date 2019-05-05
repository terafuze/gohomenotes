import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IGuestRequest } from 'app/shared/model/guest-request.model';
import { GuestRequestService } from './guest-request.service';
@Component({
    selector: 'app-list-guest-requests',
    templateUrl: './list-guest-requests.component.html'
})
export class ListGuestRequestsComponent implements OnInit, OnDestroy {
    guestRequests: IGuestRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private guestRequestService: GuestRequestService,
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
            this.guestRequestService.query().subscribe(
                (res: HttpResponse<IGuestRequest[]>) => {
                    this.guestRequests = res.body;
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
        this.registerChangeInGuestRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGuestRequest) {
        return item.id;
    }

    registerChangeInGuestRequests() {
        this.eventSubscriber = this.eventManager.subscribe('guestRequestListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
