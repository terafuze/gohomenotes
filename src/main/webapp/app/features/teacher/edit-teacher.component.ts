import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';


@Component({
    selector: 'app-edit-teacher',
    templateUrl: './edit-teacher.component.html'
})
export class EditTeacherComponent implements OnInit {

    private _teacher: ITeacher;

    isSaving: boolean;
    
    
    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
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
        
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    get teacher() {
        return this._teacher;
    }

    set teacher(teacher: ITeacher) {
        this._teacher = teacher;
    }
}
