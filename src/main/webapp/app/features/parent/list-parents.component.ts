import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';
import { StudentService } from '../student/student.service';
@Component({
    selector: 'app-list-parents',
    templateUrl: './list-parents.component.html'
})
export class ListParentsComponent implements OnInit, OnDestroy {
    parents: IParent[];
    currentAccount: any;
    eventSubscriber: Subscription;
    studentId: number;

    constructor(
        protected parentService: ParentService,
        protected studentService: StudentService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.studentId) {
            this.studentService.getParents(this.studentId).subscribe(
                (res: HttpResponse<IParent[]>) => {
                    this.parents = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
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
        this.studentId = this.activatedRoute.snapshot.queryParams['studentId'];
        this.loadAll();
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
