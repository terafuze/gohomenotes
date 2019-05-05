import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudent } from 'app/shared/model/student.model';

@Component({
    selector: 'app-view-student',
    templateUrl: './view-student.component.html'
})
export class ViewStudentComponent implements OnInit {

    student: IStudent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ student }) => {
            this.student = student;
        });
    }

    previousState() {
        window.history.back();
    }
}