import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISchool } from 'app/shared/model/school.model';
import { UserContext } from 'app/core';

@Component({
    selector: 'app-view-school',
    templateUrl: './view-school.component.html'
})
export class ViewSchoolComponent implements OnInit {

    school: ISchool;

    constructor(private activatedRoute: ActivatedRoute,
        private userContext: UserContext) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ school }) => {
            this.school = school;
            this.userContext.school = school;
        });
    }

    previousState() {
        window.history.back();
    }
}