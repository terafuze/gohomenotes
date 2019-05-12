import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGuestRequest } from 'app/shared/model/guest-request.model';


@Component({
    selector: 'app-view-guest-request',
    templateUrl: './view-guest-request.component.html'
})
export class ViewGuestRequestComponent implements OnInit {

    guestRequest: IGuestRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ guestRequest }) => {
            this.guestRequest = guestRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}