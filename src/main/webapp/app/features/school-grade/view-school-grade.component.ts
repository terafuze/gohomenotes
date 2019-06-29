import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchoolGrade } from 'app/shared/model/school-grade.model';

@Component({
    selector: 'app-view-school-grade',
    templateUrl: './view-school-grade.component.html'
})
export class ViewSchoolGradeComponent implements OnInit {
    schoolGrade: ISchoolGrade;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schoolGrade }) => {
            this.schoolGrade = schoolGrade;
        });
    }

    previousState() {
        window.history.back();
    }
}
