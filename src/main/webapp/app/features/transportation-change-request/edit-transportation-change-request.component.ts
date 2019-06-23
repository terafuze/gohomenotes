import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { DismissalLocationService } from 'app/features/dismissal-location';
import { IStudent } from 'app/shared/model/student.model';
import { StudentService } from 'app/features/student';

@Component({
    selector: 'app-edit-transportation-change-request',
    templateUrl: './edit-transportation-change-request.component.html'
})
export class EditTransportationChangeRequestComponent implements OnInit {

    private _transportationChangeRequest: ITransportationChangeRequest;

    isSaving: boolean;

    // The list of Dismissal Locations from which to select
    dismissalLocations: IDismissalLocation[];
    // The list of Students from which to select
    students: IStudent[];
    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private dismissalLocationService: DismissalLocationService,
        private studentService: StudentService,
        private transportationChangeRequestService: TransportationChangeRequestService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ transportationChangeRequest }) => {
            this.transportationChangeRequest = transportationChangeRequest;
        });
        this.dismissalLocationService.query().subscribe(
            (res: HttpResponse<IDismissalLocation[]>) => {
                this.dismissalLocations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.transportationChangeRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.transportationChangeRequestService.update(this.transportationChangeRequest));
        } else {
            
            this.subscribeToSaveResponse(this.transportationChangeRequestService.create(this.transportationChangeRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportationChangeRequest>>) {
        result.subscribe((res: HttpResponse<ITransportationChangeRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    
    trackDismissalLocationById(index: number, item: IDismissalLocation) {
        return item.id;
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

    get transportationChangeRequest() {
        return this._transportationChangeRequest;
    }

    set transportationChangeRequest(transportationChangeRequest: ITransportationChangeRequest) {
        this._transportationChangeRequest = transportationChangeRequest;
    }
}
