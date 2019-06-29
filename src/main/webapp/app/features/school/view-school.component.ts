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

    constructor(protected activatedRoute: ActivatedRoute, private userContext: UserContext) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ school }) => {
            this.school = school;
            // Set selected school in user context so that it can be used to retrieve related objects
            // without prompting the user again to select a school
            this.userContext.schoolId = school.id;
        });
    }

    previousState() {
        window.history.back();
    }
}
