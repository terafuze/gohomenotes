import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { GoHomeNotesUserProfileService } from 'app/features/user-profile';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html'
})
export class EditParentComponent implements OnInit {
  private _parent: IParent;

  isSaving: boolean;

  // The list of Students from which to select
  students: IStudent[];
  // The list of User Profiles from which to select
  userProfiles: IUserProfile[];

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jhiDataUtils: JhiDataUtils,
    protected studentService: StudentService,
    protected userProfileService: GoHomeNotesUserProfileService,
    protected parentService: ParentService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ parent }) => {
      this.parent = parent;
    });
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudent[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudent[]>) => response.body)
      )
      .subscribe((res: IStudent[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userProfileService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUserProfile[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUserProfile[]>) => response.body)
      )
      .subscribe((res: IUserProfile[]) => (this.userProfiles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.parent.id !== undefined) {
      this.subscribeToSaveResponse(this.parentService.update(this.parent));
    } else {
      this.subscribeToSaveResponse(this.parentService.create(this.parent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParent>>) {
    result.subscribe((res: HttpResponse<IParent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackStudentById(index: number, item: IStudent) {
    return item.id;
  }

  trackUserProfileById(index: number, item: IUserProfile) {
    return item.id;
  }

  // TODO if not needed, remove this function
  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }

  get parent() {
    return this._parent;
  }

  set parent(parent: IParent) {
    this._parent = parent;
  }
}
