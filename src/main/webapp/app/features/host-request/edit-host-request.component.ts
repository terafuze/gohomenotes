import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IHostRequest } from 'app/shared/model/host-request.model';
import { HostRequestService } from './host-request.service';


@Component({
    selector: 'app-edit-host-request',
    templateUrl: './edit-host-request.component.html'
})
export class EditHostRequestComponent implements OnInit {

    private _hostRequest: IHostRequest;

    isSaving: boolean;
    
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private hostRequestService: HostRequestService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ hostRequest }) => {
            this.hostRequest = hostRequest;
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
        
        if (this.hostRequest.id !== undefined) {
            this.subscribeToSaveResponse(this.hostRequestService.update(this.hostRequest));
        } else {
            this.subscribeToSaveResponse(this.hostRequestService.create(this.hostRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHostRequest>>) {
        result.subscribe((res: HttpResponse<IHostRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get hostRequest() {
        return this._hostRequest;
    }

    set hostRequest(hostRequest: IHostRequest) {
        this._hostRequest = hostRequest;
    }
}
