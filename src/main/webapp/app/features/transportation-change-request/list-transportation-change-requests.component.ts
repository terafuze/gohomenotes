import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
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
        private transportationChangeRequestService: TransportationChangeRequestService,
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
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
