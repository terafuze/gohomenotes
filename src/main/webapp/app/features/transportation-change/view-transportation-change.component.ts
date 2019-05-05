import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportationChange } from 'app/shared/model/transportation-change.model';

@Component({
    selector: 'app-view-transportation-change',
    templateUrl: './view-transportation-change.component.html'
})
export class ViewTransportationChangeComponent implements OnInit {

    transportationChange: ITransportationChange;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationChange }) => {
            this.transportationChange = transportationChange;
        });
    }

    previousState() {
        window.history.back();
    }
}