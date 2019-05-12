import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParent } from 'app/shared/model/parent.model';


@Component({
    selector: 'app-view-parent',
    templateUrl: './view-parent.component.html'
})
export class ViewParentComponent implements OnInit {

    parent: IParent;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parent }) => {
            this.parent = parent;
        });
    }

    previousState() {
        window.history.back();
    }
}