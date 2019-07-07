import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';
@Component({
  selector: 'app-list-dismissal-locations',
  templateUrl: './list-dismissal-locations.component.html'
})
export class ListDismissalLocationsComponent implements OnInit, OnDestroy {
  dismissalLocations: IDismissalLocation[];
  currentAccount: any;
  eventSubscriber: Subscription;
  schoolId: number;

  constructor(
    protected dismissalLocationService: DismissalLocationService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.dismissalLocationService.query().subscribe(
      (res: HttpResponse<IDismissalLocation[]>) => {
        this.dismissalLocations = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDismissalLocations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDismissalLocation) {
    return item.id;
  }

  registerChangeInDismissalLocations() {
    this.eventSubscriber = this.eventManager.subscribe('dismissalLocationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
