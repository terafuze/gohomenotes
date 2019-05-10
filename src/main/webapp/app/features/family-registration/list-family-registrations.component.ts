import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistrationService } from './family-registration.service';
@Component({
    selector: 'app-list-family-registrations',
    templateUrl: './list-family-registrations.component.html'
})
export class ListFamilyRegistrationsComponent implements OnInit, OnDestroy {
    familyRegistrations: IFamilyRegistration[];
    currentAccount: any;
    eventSubscriber: Subscription;
    parentRegistrationId: number;
    studentRegistrationId: number;
    

    constructor(
        private familyRegistrationService: FamilyRegistrationService,
        private parentRegistrationService: ParentRegistrationService,
        private studentRegistrationService: StudentRegistrationService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.parentRegistrationId) {
            this.parentRegistrationService.getFamilyRegistrations(this.parentRegistrationId).subscribe(
                (res: HttpResponse<IFamilyRegistration[]>) => {
                    this.familyRegistrations = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.studentRegistrationId) {
            this.studentRegistrationService.getFamilyRegistrations(this.studentRegistrationId).subscribe(
                (res: HttpResponse<IFamilyRegistration[]>) => {
                    this.familyRegistrations = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.familyRegistrationService.query().subscribe(
                (res: HttpResponse<IFamilyRegistration[]>) => {
                    this.familyRegistrations = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.parentRegistrationId = this.activatedRoute.snapshot.queryParams['parentRegistrationId'];
        this.studentRegistrationId = this.activatedRoute.snapshot.queryParams['studentRegistrationId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFamilyRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFamilyRegistration) {
        return item.id;
    }

    registerChangeInFamilyRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('familyRegistrationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
