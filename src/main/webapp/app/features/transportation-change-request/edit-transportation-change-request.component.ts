import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';
import { TransportationChangeRequestService } from './transportation-change-request.service';


@Component({
    selector: 'app-edit-transportation-change-request',
    templateUrl: './edit-transportation-change-request.component.html'
})
export class EditTransportationChangeRequestComponent implements OnInit {

    private _transportationChangeRequest: ITransportationChangeRequest;

    isSaving: boolean;

    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private transportationChangeRequestService: TransportationChangeRequestService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ transportationChangeRequest }) => {
            this.transportationChangeRequest = transportationChangeRequest;
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
