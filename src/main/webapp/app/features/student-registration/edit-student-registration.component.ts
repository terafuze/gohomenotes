import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { StudentRegistrationService } from './student-registration.service';


@Component({
    selector: 'app-edit-student-registration',
    templateUrl: './edit-student-registration.component.html'
})
export class EditStudentRegistrationComponent implements OnInit {

    private _studentRegistration: IStudentRegistration;

    isSaving: boolean;

    
    familyRegistrationId: number;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private studentRegistrationService: StudentRegistrationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.familyRegistrationId = this.activatedRoute.snapshot.params['familyRegistrationId'];
        this.activatedRoute.data.subscribe(({ studentRegistration }) => {
            this.studentRegistration = studentRegistration;
        });
        
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
        if (this.studentRegistration.id !== undefined) {
            this.subscribeToSaveResponse(this.studentRegistrationService.update(this.studentRegistration));
        } else {
            this.studentRegistration.familyRegistrationId = this.familyRegistrationId;
            this.subscribeToSaveResponse(this.studentRegistrationService.create(this.studentRegistration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IStudentRegistration>>) {
        result.subscribe((res: HttpResponse<IStudentRegistration>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get studentRegistration() {
        return this._studentRegistration;
    }

    set studentRegistration(studentRegistration: IStudentRegistration) {
        this._studentRegistration = studentRegistration;
    }
}
