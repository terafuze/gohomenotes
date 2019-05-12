import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from './parent.service';


@Component({
    selector: 'app-edit-parent',
    templateUrl: './edit-parent.component.html'
})
export class EditParentComponent implements OnInit {

    private _parent: IParent;

    isSaving: boolean;

    
    

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private parentService: ParentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ parent }) => {
            this.parent = parent;
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
        if (this.parent.id !== undefined) {
            this.subscribeToSaveResponse(this.parentService.update(this.parent));
        } else {
            
            this.subscribeToSaveResponse(this.parentService.create(this.parent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IParent>>) {
        result.subscribe((res: HttpResponse<IParent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get parent() {
        return this._parent;
    }

    set parent(parent: IParent) {
        this._parent = parent;
    }
}
