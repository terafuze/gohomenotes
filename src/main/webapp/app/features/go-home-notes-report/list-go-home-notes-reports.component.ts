import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';
import { GoHomeNotesReportService } from './go-home-notes-report.service';

@Component({
  selector: 'app-list-go-home-notes-reports',
  templateUrl: './list-go-home-notes-reports.component.html'
})
export class ListGoHomeNotesReportsComponent implements OnInit, OnDestroy {
  goHomeNotesReports: IGoHomeNotesReport[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected goHomeNotesReportService: GoHomeNotesReportService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.goHomeNotesReportService.query().subscribe(
      (res: HttpResponse<IGoHomeNotesReport[]>) => {
        this.goHomeNotesReports = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGoHomeNotesReports();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGoHomeNotesReport) {
    return item.id;
  }

  registerChangeInGoHomeNotesReports() {
    this.eventSubscriber = this.eventManager.subscribe('goHomeNotesReportListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
