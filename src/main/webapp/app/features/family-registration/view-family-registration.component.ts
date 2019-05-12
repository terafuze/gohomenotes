import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFamilyRegistration } from 'app/shared/model/family-registration.model';


@Component({
    selector: 'app-view-family-registration',
    templateUrl: './view-family-registration.component.html'
})
export class ViewFamilyRegistrationComponent implements OnInit {

    familyRegistration: IFamilyRegistration;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ familyRegistration }) => {
            this.familyRegistration = familyRegistration;
        });
    }

    previousState() {
        window.history.back();
    }
}