import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITransportationChange } from 'app/shared/model/transportation-change.model';
import { TransportationChangeService } from './transportation-change.service';


@Component({
    selector: 'app-edit-transportation-change',
    templateUrl: './edit-transportation-change.component.html'
})
export class EditTransportationChangeComponent implements OnInit {

    private _transportationChange: ITransportationChange;

    isSaving: boolean;
    
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private transportationChangeService: TransportationChangeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ transportationChange }) => {
            this.transportationChange = transportationChange;
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
        
        if (this.transportationChange.id !== undefined) {
            this.subscribeToSaveResponse(this.transportationChangeService.update(this.transportationChange));
        } else {
            this.subscribeToSaveResponse(this.transportationChangeService.create(this.transportationChange));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransportationChange>>) {
        result.subscribe((res: HttpResponse<ITransportationChange>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get transportationChange() {
        return this._transportationChange;
    }

    set transportationChange(transportationChange: ITransportationChange) {
        this._transportationChange = transportationChange;
    }
}
