import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILegalGuardian } from 'app/shared/model/legal-guardian.model';

@Component({
    selector: 'app-view-legal-guardian',
    templateUrl: './view-legal-guardian.component.html'
})
export class ViewLegalGuardianComponent implements OnInit {

    legalGuardian: ILegalGuardian;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ legalGuardian }) => {
            this.legalGuardian = legalGuardian;
        });
    }

    previousState() {
        window.history.back();
    }
}