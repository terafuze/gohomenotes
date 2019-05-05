import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { AfterSchoolProgramService } from './after-school-program.service';


@Component({
    selector: 'app-edit-after-school-program',
    templateUrl: './edit-after-school-program.component.html'
})
export class EditAfterSchoolProgramComponent implements OnInit {

    private _afterSchoolProgram: IAfterSchoolProgram;

    isSaving: boolean;
    
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private afterSchoolProgramService: AfterSchoolProgramService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ afterSchoolProgram }) => {
            this.afterSchoolProgram = afterSchoolProgram;
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
        
        if (this.afterSchoolProgram.id !== undefined) {
            this.subscribeToSaveResponse(this.afterSchoolProgramService.update(this.afterSchoolProgram));
        } else {
            this.subscribeToSaveResponse(this.afterSchoolProgramService.create(this.afterSchoolProgram));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAfterSchoolProgram>>) {
        result.subscribe((res: HttpResponse<IAfterSchoolProgram>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get afterSchoolProgram() {
        return this._afterSchoolProgram;
    }

    set afterSchoolProgram(afterSchoolProgram: IAfterSchoolProgram) {
        this._afterSchoolProgram = afterSchoolProgram;
    }
}
