import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';
import { SchoolService } from '../school/school.service';
@Component({
    selector: 'app-list-dismissal-locations',
    templateUrl: './list-dismissal-locations.component.html'
})
export class ListDismissalLocationsComponent implements OnInit, OnDestroy {
    dismissalLocations: IDismissalLocation[];
    currentAccount: any;
    eventSubscriber: Subscription;
    schoolId: number;
    

    constructor(
        private dismissalLocationService: DismissalLocationService,
        private schoolService: SchoolService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.schoolId) {
            this.schoolService.getDismissalLocations(this.schoolId).subscribe(
                (res: HttpResponse<IDismissalLocation[]>) => {
                    this.dismissalLocations = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.dismissalLocationService.query().subscribe(
                (res: HttpResponse<IDismissalLocation[]>) => {
                    this.dismissalLocations = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.schoolId = this.activatedRoute.snapshot.queryParams['schoolId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDismissalLocations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDismissalLocation) {
        return item.id;
    }

    registerChangeInDismissalLocations() {
        this.eventSubscriber = this.eventManager.subscribe('dismissalLocationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
