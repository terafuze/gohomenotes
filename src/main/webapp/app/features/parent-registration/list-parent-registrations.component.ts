import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistrationService } from './parent-registration.service';
@Component({
    selector: 'app-list-parent-registrations',
    templateUrl: './list-parent-registrations.component.html'
})
export class ListParentRegistrationsComponent implements OnInit, OnDestroy {
    parentRegistrations: IParentRegistration[];
    currentAccount: any;
    eventSubscriber: Subscription;
    familyRegistrationId: number;
    

    constructor(
        private parentRegistrationService: ParentRegistrationService,
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
            this.parentRegistrationService.query().subscribe(
                (res: HttpResponse<IParentRegistration[]>) => {
                    this.parentRegistrations = res.body;
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
        this.registerChangeInParentRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParentRegistration) {
        return item.id;
    }

    registerChangeInParentRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('parentRegistrationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
