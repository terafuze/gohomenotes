import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParentRegistration } from 'app/shared/model/parent-registration.model';


@Component({
    selector: 'app-view-parent-registration',
    templateUrl: './view-parent-registration.component.html'
})
export class ViewParentRegistrationComponent implements OnInit {

    parentRegistration: IParentRegistration;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parentRegistration }) => {
            this.parentRegistration = parentRegistration;
        });
    }

    previousState() {
        window.history.back();
    }
}