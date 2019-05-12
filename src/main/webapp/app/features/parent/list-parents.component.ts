import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';
@Component({
    selector: 'app-list-parents',
    templateUrl: './list-parents.component.html'
})
export class ListParentsComponent implements OnInit, OnDestroy {
    parents: IParent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private parentService: ParentService,
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
            this.parentService.query().subscribe(
                (res: HttpResponse<IParent[]>) => {
                    this.parents = res.body;
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
        this.registerChangeInParents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IParent) {
        return item.id;
    }

    registerChangeInParents() {
        this.eventSubscriber = this.eventManager.subscribe('parentListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
