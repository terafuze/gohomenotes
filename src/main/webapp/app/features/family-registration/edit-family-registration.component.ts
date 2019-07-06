import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistrationService } from './family-registration.service';

import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { ParentRegistrationService } from 'app/features/parent-registration';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from 'app/features/student-registration';

@Component({
  selector: 'app-edit-family-registration',
  templateUrl: './edit-family-registration.component.html'
})
export class EditFamilyRegistrationComponent implements OnInit {
  private _familyRegistration: IFamilyRegistration;

  isSaving: boolean;

  // The list of Parent Registrations from which to select
  parentRegistrations: IParentRegistration[];
  // The list of Student Registrations from which to select
  studentRegistrations: IStudentRegistration[];

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected jhiDataUtils: JhiDataUtils,
    protected parentRegistrationService: ParentRegistrationService,
    protected studentRegistrationService: StudentRegistrationService,
    protected familyRegistrationService: FamilyRegistrationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ familyRegistration }) => {
      this.familyRegistration = familyRegistration;
    });
    this.parentRegistrationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IParentRegistration[]>) => mayBeOk.ok),
        map((response: HttpResponse<IParentRegistration[]>) => response.body)
      )
      .subscribe((res: IParentRegistration[]) => (this.parentRegistrations = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.studentRegistrationService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudentRegistration[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudentRegistration[]>) => response.body)
      )
      .subscribe((res: IStudentRegistration[]) => (this.studentRegistrations = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.familyRegistration.id !== undefined) {
      this.subscribeToSaveResponse(this.familyRegistrationService.update(this.familyRegistration));
    } else {
      this.subscribeToSaveResponse(this.familyRegistrationService.create(this.familyRegistration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFamilyRegistration>>) {
    result.subscribe((res: HttpResponse<IFamilyRegistration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackParentRegistrationById(index: number, item: IParentRegistration) {
    return item.id;
  }

  trackStudentRegistrationById(index: number, item: IStudentRegistration) {
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

  get familyRegistration() {
    return this._familyRegistration;
  }

  set familyRegistration(familyRegistration: IFamilyRegistration) {
    this._familyRegistration = familyRegistration;
  }
}
