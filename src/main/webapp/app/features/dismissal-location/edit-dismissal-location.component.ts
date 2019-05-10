import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from './dismissal-location.service';

import { ISchool } from 'app/shared/model/school.model';
import { SchoolService } from 'app/features/school';

@Component({
    selector: 'app-edit-dismissal-location',
    templateUrl: './edit-dismissal-location.component.html'
})
export class EditDismissalLocationComponent implements OnInit {

    private _dismissalLocation: IDismissalLocation;

    isSaving: boolean;
    
    schoolId: number;
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private dismissalLocationService: DismissalLocationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.schoolId = this.activatedRoute.snapshot.params['schoolId'];
        this.activatedRoute.data.subscribe(({ dismissalLocation }) => {
            this.dismissalLocation = dismissalLocation;
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
        if (this.dismissalLocation.id !== undefined) {
            this.subscribeToSaveResponse(this.dismissalLocationService.update(this.dismissalLocation));
        } else {
            this.dismissalLocation.schoolId = this.schoolId;
            this.subscribeToSaveResponse(this.dismissalLocationService.create(this.dismissalLocation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDismissalLocation>>) {
        result.subscribe((res: HttpResponse<IDismissalLocation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    
    trackSchoolById(index: number, item: ISchool) {
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

    get dismissalLocation() {
        return this._dismissalLocation;
    }

    set dismissalLocation(dismissalLocation: IDismissalLocation) {
        this._dismissalLocation = dismissalLocation;
    }
}
