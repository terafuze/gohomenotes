import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IFamily } from 'app/shared/model/family.model';
import { FamilyService } from './family.service';
@Component({
    selector: 'app-list-families',
    templateUrl: './list-families.component.html'
})
export class ListFamiliesComponent implements OnInit, OnDestroy {
    families: IFamily[];
    currentAccount: any;
    eventSubscriber: Subscription;
    studentId: number;
    parentId: number;
    

    constructor(
        private familyService: FamilyService,
        private studentService: StudentService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.studentId) {
            this.studentService.getFamilies(this.studentId).subscribe(
                (res: HttpResponse<IFamily[]>) => {
                    this.families = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        if (this.parentId) {
            this.parentService.getFamilies(this.parentId).subscribe(
                (res: HttpResponse<IFamily[]>) => {
                    this.families = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.familyService.query().subscribe(
                (res: HttpResponse<IFamily[]>) => {
                    this.families = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.studentId = this.activatedRoute.snapshot.queryParams['studentId'];
        this.parentId = this.activatedRoute.snapshot.queryParams['parentId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFamilies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFamily) {
        return item.id;
    }

    registerChangeInFamilies() {
        this.eventSubscriber = this.eventManager.subscribe('familyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
