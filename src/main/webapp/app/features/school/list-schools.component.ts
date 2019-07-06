import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ISchool } from 'app/shared/model/school.model';
import { SchoolService } from './school.service';
@Component({
  selector: 'app-list-schools',
  templateUrl: './list-schools.component.html'
})
export class ListSchoolsComponent implements OnInit, OnDestroy {
  schools: ISchool[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected schoolService: SchoolService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    let dataLoaded = false;
    // If no items loaded so far, then load all of them
    if (!dataLoaded) {
      this.schoolService.query().subscribe(
        (res: HttpResponse<ISchool[]>) => {
          this.schools = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInSchools();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISchool) {
    return item.id;
  }

  registerChangeInSchools() {
    this.eventSubscriber = this.eventManager.subscribe('schoolListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
