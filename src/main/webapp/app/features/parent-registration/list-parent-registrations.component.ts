import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
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
    protected parentRegistrationService: ParentRegistrationService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.parentRegistrationService.query().subscribe(
      (res: HttpResponse<IParentRegistration[]>) => {
        this.parentRegistrations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
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

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
