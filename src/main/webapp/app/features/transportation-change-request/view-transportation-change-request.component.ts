import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';

@Component({
    selector: 'app-view-transportation-change-request',
    templateUrl: './view-transportation-change-request.component.html'
})
export class ViewTransportationChangeRequestComponent implements OnInit {
    transportationChangeRequest: ITransportationChangeRequest;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transportationChangeRequest }) => {
            this.transportationChangeRequest = transportationChangeRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}
