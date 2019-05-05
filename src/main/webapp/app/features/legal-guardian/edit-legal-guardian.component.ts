import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ILegalGuardian } from 'app/shared/model/legal-guardian.model';
import { LegalGuardianService } from './legal-guardian.service';


@Component({
    selector: 'app-edit-legal-guardian',
    templateUrl: './edit-legal-guardian.component.html'
})
export class EditLegalGuardianComponent implements OnInit {

    private _legalGuardian: ILegalGuardian;

    isSaving: boolean;
    
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private legalGuardianService: LegalGuardianService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ legalGuardian }) => {
            this.legalGuardian = legalGuardian;
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
        
        if (this.legalGuardian.id !== undefined) {
            this.subscribeToSaveResponse(this.legalGuardianService.update(this.legalGuardian));
        } else {
            this.subscribeToSaveResponse(this.legalGuardianService.create(this.legalGuardian));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ILegalGuardian>>) {
        result.subscribe((res: HttpResponse<ILegalGuardian>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get legalGuardian() {
        return this._legalGuardian;
    }

    set legalGuardian(legalGuardian: ILegalGuardian) {
        this._legalGuardian = legalGuardian;
    }
}
