import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentRegistration } from 'app/shared/model/student-registration.model';


@Component({
    selector: 'app-view-student-registration',
    templateUrl: './view-student-registration.component.html'
})
export class ViewStudentRegistrationComponent implements OnInit {

    studentRegistration: IStudentRegistration;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ studentRegistration }) => {
            this.studentRegistration = studentRegistration;
        });
    }

    previousState() {
        window.history.back();
    }
}