import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from './student-registration.service';
@Component({
    selector: 'app-list-student-registrations',
    templateUrl: './list-student-registrations.component.html'
})
export class ListStudentRegistrationsComponent implements OnInit, OnDestroy {
    studentRegistrations: IStudentRegistration[];
    currentAccount: any;
    eventSubscriber: Subscription;
    familyRegistrationId: number;
    schoolGradeId: number;
    

    constructor(
        private studentRegistrationService: StudentRegistrationService,
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
            this.studentRegistrationService.query().subscribe(
                (res: HttpResponse<IStudentRegistration[]>) => {
                    this.studentRegistrations = res.body;
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
        this.registerChangeInStudentRegistrations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStudentRegistration) {
        return item.id;
    }

    registerChangeInStudentRegistrations() {
        this.eventSubscriber = this.eventManager.subscribe('studentRegistrationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
