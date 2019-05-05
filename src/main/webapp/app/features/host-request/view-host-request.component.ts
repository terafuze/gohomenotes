import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHostRequest } from 'app/shared/model/host-request.model';

@Component({
    selector: 'app-view-host-request',
    templateUrl: './view-host-request.component.html'
})
export class ViewHostRequestComponent implements OnInit {

    hostRequest: IHostRequest;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ hostRequest }) => {
            this.hostRequest = hostRequest;
        });
    }

    previousState() {
        window.history.back();
    }
}