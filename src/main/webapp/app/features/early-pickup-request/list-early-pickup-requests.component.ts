import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
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
        private earlyPickupRequestService: EarlyPickupRequestService,
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
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
