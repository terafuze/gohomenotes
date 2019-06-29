import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

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
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private parentRegistrationService: ParentRegistrationService,
        private studentRegistrationService: StudentRegistrationService,
        private familyRegistrationService: FamilyRegistrationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ familyRegistration }) => {
            this.familyRegistration = familyRegistration;
        });
        this.parentRegistrationService.query().subscribe(
            (res: HttpResponse<IParentRegistration[]>) => {
                this.parentRegistrations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.studentRegistrationService.query().subscribe(
            (res: HttpResponse<IStudentRegistration[]>) => {
                this.studentRegistrations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFamilyRegistration>>) {
        result.subscribe((res: HttpResponse<IFamilyRegistration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
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
