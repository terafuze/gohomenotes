import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

import { IUserProfile } from 'app/shared/model/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserContext {
    constructor(private $sessionStorage: SessionStorageService, private router: Router) {}

    public get schoolId(): number {
        const schoolId = this.$sessionStorage.retrieve('schoolId');
        if (schoolId) {
            return schoolId;
        } else {
            // no School is currently selected, then route the user to the Schools page to select a School.
            this.router.navigateByUrl('/schools');
        }
    }

    public set schoolId(value: number) {
        this.$sessionStorage.store('schoolId', value);
    }

    public get userProfile(): IUserProfile {
        return this.$sessionStorage.retrieve('userProfile');
    }

    public set userProfile(value: IUserProfile) {
        this.$sessionStorage.store('userProfile', value);
    }

    public get userProfileId(): number {
        const userProfileId = this.$sessionStorage.retrieve('userProfileId');
        if (userProfileId) {
            return userProfileId;
        } else {
            // no User Profile is currently selected, then route the user to the User Profiles page to select a User Profile.
            this.router.navigateByUrl('/user_profiles');
        }
    }

    public set userProfileId(value: number) {
        this.$sessionStorage.store('userProfileId', value);
    }
}
