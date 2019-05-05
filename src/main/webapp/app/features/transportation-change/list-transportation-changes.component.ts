import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { ITransportationChange } from 'app/shared/model/transportation-change.model';
import { TransportationChangeService } from './transportation-change.service';
@Component({
    selector: 'app-list-transportation-changes',
    templateUrl: './list-transportation-changes.component.html'
})
export class ListTransportationChangesComponent implements OnInit, OnDestroy {
    transportationChanges: ITransportationChange[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private transportationChangeService: TransportationChangeService,
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
            this.transportationChangeService.query().subscribe(
                (res: HttpResponse<ITransportationChange[]>) => {
                    this.transportationChanges = res.body;
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
        this.registerChangeInTransportationChanges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransportationChange) {
        return item.id;
    }

    registerChangeInTransportationChanges() {
        this.eventSubscriber = this.eventManager.subscribe('transportationChangeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
