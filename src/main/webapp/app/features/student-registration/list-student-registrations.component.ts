import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from './student-registration.service';
import { FamilyRegistrationService } from '../family-registration/family-registration.service';

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
    protected studentRegistrationService: StudentRegistrationService,
    protected familyRegistrationService: FamilyRegistrationService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.studentRegistrationService.query().subscribe(
      (res: HttpResponse<IStudentRegistration[]>) => {
        this.studentRegistrations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
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

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
