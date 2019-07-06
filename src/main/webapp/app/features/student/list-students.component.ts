import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from './student.service';
import { ParentService } from '../parent/parent.service';
import { SchoolService } from '../school/school.service';
import { TeacherService } from '../teacher/teacher.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html'
})
export class ListStudentsComponent implements OnInit, OnDestroy {
  students: IStudent[];
  currentAccount: any;
  eventSubscriber: Subscription;
  parentId: number;
  schoolId: number;
  teacherId: number;

  constructor(
    protected studentService: StudentService,
    protected parentService: ParentService,
    protected schoolService: SchoolService,
    protected teacherService: TeacherService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    let dataLoaded = false;
    if (this.parentId) {
      this.parentService.getStudents(this.parentId).subscribe(
        (res: HttpResponse<IStudent[]>) => {
          this.students = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
      dataLoaded = true;
    }
    if (this.schoolId) {
      this.schoolService.getStudents(this.schoolId).subscribe(
        (res: HttpResponse<IStudent[]>) => {
          this.students = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
      dataLoaded = true;
    }
    if (this.teacherId) {
      this.teacherService.getStudents(this.teacherId).subscribe(
        (res: HttpResponse<IStudent[]>) => {
          this.students = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
      dataLoaded = true;
    }
    // If no items loaded so far, then load all of them
    if (!dataLoaded) {
      this.studentService.query().subscribe(
        (res: HttpResponse<IStudent[]>) => {
          this.students = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  ngOnInit() {
    this.parentId = this.activatedRoute.snapshot.queryParams['parentId'];
    this.schoolId = this.activatedRoute.snapshot.queryParams['schoolId'];
    this.teacherId = this.activatedRoute.snapshot.queryParams['teacherId'];
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStudents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStudent) {
    return item.id;
  }

  registerChangeInStudents() {
    this.eventSubscriber = this.eventManager.subscribe('studentListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
