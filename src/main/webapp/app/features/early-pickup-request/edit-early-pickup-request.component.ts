import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';
import { EarlyPickupRequestService } from './early-pickup-request.service';

import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-early-pickup-request',
    templateUrl: './edit-early-pickup-request.component.html'
})
export class EditEarlyPickupRequestComponent implements OnInit {

    private _earlyPickupRequest: IEarlyPickupRequest;

    isSaving: boolean;

    // The list of Students from which to select
    students: IStudent[];
    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private studentService: StudentService,
        private earlyPickupRequestService: EarlyPickupRequestService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ earlyPickupRequest }) => {
            this.earlyPickupRequest = earlyPickupRequest;
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
        if (this.earlyPickupRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.earlyPickupRequestService.update(this.earlyPickupRequest));
        } else {
            
            this.subscribeToSaveResponse(this.earlyPickupRequestService.create(this.earlyPickupRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEarlyPickupRequest>>) {
        result.subscribe((res: HttpResponse<IEarlyPickupRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get earlyPickupRequest() {
        return this._earlyPickupRequest;
    }

    set earlyPickupRequest(earlyPickupRequest: IEarlyPickupRequest) {
        this._earlyPickupRequest = earlyPickupRequest;
    }
}
