import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeacher } from 'app/shared/model/teacher.model';

@Component({
    selector: 'app-view-teacher',
    templateUrl: './view-teacher.component.html'
})
export class ViewTeacherComponent implements OnInit {

    teacher: ITeacher;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
    }

    previousState() {
        window.history.back();
    }
}