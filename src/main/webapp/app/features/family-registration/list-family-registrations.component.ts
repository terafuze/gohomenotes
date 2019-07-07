import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
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

  constructor(
    protected familyRegistrationService: FamilyRegistrationService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.familyRegistrationService.query().subscribe(
      (res: HttpResponse<IFamilyRegistration[]>) => {
        this.familyRegistrations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
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

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
