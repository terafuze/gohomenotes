import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { FamilyRegistrationService } from './family-registration.service';


@Component({
    selector: 'app-edit-family-registration',
    templateUrl: './edit-family-registration.component.html'
})
export class EditFamilyRegistrationComponent implements OnInit {

    private _familyRegistration: IFamilyRegistration;

    isSaving: boolean;

    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private familyRegistrationService: FamilyRegistrationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ familyRegistration }) => {
            this.familyRegistration = familyRegistration;
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
