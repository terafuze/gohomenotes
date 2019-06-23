import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IGuestRequest } from 'app/shared/model/guest-request.model';
import { GuestRequestService } from './guest-request.service';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-guest-request',
    templateUrl: './edit-guest-request.component.html'
})
export class EditGuestRequestComponent implements OnInit {

    private _guestRequest: IGuestRequest;

    isSaving: boolean;

    // The list of Students from which to select
    students: IStudent[];
    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private studentService: StudentService,
        private guestRequestService: GuestRequestService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ guestRequest }) => {
            this.guestRequest = guestRequest;
        });
        this.studentService.query().subscribe(
            (res: HttpResponse<IStudent[]>) => {
                this.students = res.body;
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
        if (this.guestRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.guestRequestService.update(this.guestRequest));
        } else {
            
            this.subscribeToSaveResponse(this.guestRequestService.create(this.guestRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGuestRequest>>) {
        result.subscribe((res: HttpResponse<IGuestRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    
    trackStudentById(index: number, item: IStudent) {
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

    get guestRequest() {
        return this._guestRequest;
    }

    set guestRequest(guestRequest: IGuestRequest) {
        this._guestRequest = guestRequest;
    }
}
