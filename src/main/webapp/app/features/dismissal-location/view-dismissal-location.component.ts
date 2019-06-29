import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';

@Component({
    selector: 'app-view-dismissal-location',
    templateUrl: './view-dismissal-location.component.html'
})
export class ViewDismissalLocationComponent implements OnInit {
    dismissalLocation: IDismissalLocation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dismissalLocation }) => {
            this.dismissalLocation = dismissalLocation;
        });
    }

    previousState() {
        window.history.back();
    }
}
