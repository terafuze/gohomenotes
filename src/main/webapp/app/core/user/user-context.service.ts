import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { ISchool } from 'app/shared/model/school.model';

@Injectable({ providedIn: 'root' })
export class UserContext {
    constructor(private $sessionStorage: SessionStorageService) {}

    public get school(): ISchool {
        return this.$sessionStorage.retrieve('school');
    }

    public set school(value: ISchool) {
        this.$sessionStorage.store('school', value);
    }

}
