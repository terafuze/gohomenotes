import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { ISchool } from 'app/shared/model/school.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({ providedIn: 'root' })
export class UserContext {

    constructor(private $sessionStorage: SessionStorageService,
        private router: Router) { }

    /**
     * If no school is currently selected, then route the user to the School page
     * to select a school.
     */
    public get schoolId(): number {
        const schoolId = this.$sessionStorage.retrieve('schoolId');
        if (schoolId) {
            return schoolId;
        } else {
            this.router.navigateByUrl('/schools');
        }
    }

    public set schoolId(schoolId: number) {
        this.$sessionStorage.store('schoolId', schoolId);
    }

    public get userProfile(): IUserProfile {
        return this.$sessionStorage.retrieve('userProfile');
    }

    public set userProfile(value: IUserProfile) {
        this.$sessionStorage.store('userProfile', value);
    }
}
