import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserContext } from 'app/core';

@Component({
    selector: 'app-view-user-profile',
    templateUrl: './view-user-profile.component.html'
})
export class ViewUserProfileComponent implements OnInit {

    userProfile: IUserProfile;

    constructor(private activatedRoute: ActivatedRoute,
        private userContext: UserContext) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
            this.userContext.userProfile = userProfile;
        });
    }

    previousState() {
        window.history.back();
    }
}