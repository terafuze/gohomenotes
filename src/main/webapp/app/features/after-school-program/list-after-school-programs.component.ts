import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';
import { SchoolService } from '../school/school.service';

@Component({
  selector: 'app-list-after-school-programs',
  templateUrl: './list-after-school-programs.component.html'
})
export class ListAfterSchoolProgramsComponent implements OnInit, OnDestroy {
  afterSchoolPrograms: IAfterSchoolProgram[];
  currentAccount: any;
  eventSubscriber: Subscription;
  schoolId: number;

  constructor(
    protected afterSchoolProgramService: AfterSchoolProgramService,
    protected schoolService: SchoolService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.afterSchoolProgramService.query().subscribe(
      (res: HttpResponse<IAfterSchoolProgram[]>) => {
        this.afterSchoolPrograms = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAfterSchoolPrograms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAfterSchoolProgram) {
    return item.id;
  }

  registerChangeInAfterSchoolPrograms() {
    this.eventSubscriber = this.eventManager.subscribe('afterSchoolProgramListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
