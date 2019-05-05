import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';

@Component({
    selector: 'app-view-after-school-program',
    templateUrl: './view-after-school-program.component.html'
})
export class ViewAfterSchoolProgramComponent implements OnInit {

    afterSchoolProgram: IAfterSchoolProgram;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ afterSchoolProgram }) => {
            this.afterSchoolProgram = afterSchoolProgram;
        });
    }

    previousState() {
        window.history.back();
    }
}