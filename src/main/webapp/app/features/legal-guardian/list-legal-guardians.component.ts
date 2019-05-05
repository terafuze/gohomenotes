import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { ILegalGuardian } from 'app/shared/model/legal-guardian.model';
import { LegalGuardianService } from './legal-guardian.service';
@Component({
    selector: 'app-list-legal-guardians',
    templateUrl: './list-legal-guardians.component.html'
})
export class ListLegalGuardiansComponent implements OnInit, OnDestroy {
    legalGuardians: ILegalGuardian[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private legalGuardianService: LegalGuardianService,
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
            this.legalGuardianService.query().subscribe(
                (res: HttpResponse<ILegalGuardian[]>) => {
                    this.legalGuardians = res.body;
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
        this.registerChangeInLegalGuardians();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ILegalGuardian) {
        return item.id;
    }

    registerChangeInLegalGuardians() {
        this.eventSubscriber = this.eventManager.subscribe('legalGuardianListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
