import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';

@Component({
    selector: 'app-view-early-pickup-request',
    templateUrl: './view-early-pickup-request.component.html'
})
export class ViewEarlyPickupRequestComponent implements OnInit {

    earlyPickupRequest: IEarlyPickupRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ earlyPickupRequest }) => {
            this.earlyPickupRequest = earlyPickupRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}