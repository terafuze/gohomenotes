import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { ISchool } from 'app/shared/model/school.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserContext {

    constructor(private $sessionStorage: SessionStorageService) { }
    
    public get school(): ISchool {
        return this.$sessionStorage.retrieve('school');
    }

    public set school(value: ISchool) {
        this.$sessionStorage.store('school', value);
    }
    
    public get userProfile(): IUserProfile {
        return this.$sessionStorage.retrieve('school');
    }

    public set userProfile(value: IUserProfile) {
        this.$sessionStorage.store('userProfile', value);
    }
    
}
