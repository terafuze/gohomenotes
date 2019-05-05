import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
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
        private hostRequestService: HostRequestService,
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
        this.principal.identity().then(account => {
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
