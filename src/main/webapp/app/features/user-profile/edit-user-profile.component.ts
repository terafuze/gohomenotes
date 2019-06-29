import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';

import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/features/address';
import { IParent } from 'app/shared/model/parent.model';
import { ParentService } from 'app/features/parent';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/features/teacher';
import { UserService, IUser } from 'app/core';

@Component({
    selector: 'app-edit-user-profile',
    templateUrl: './edit-user-profile.component.html'
})
export class EditUserProfileComponent implements OnInit {
    private _userProfile: IUserProfile;

    isSaving: boolean;

    // The list of Addresses from which to select
    addresses: IAddress[];
    // The list of Parents from which to select
    parents: IParent[];
    // The list of Teachers from which to select
    teachers: ITeacher[];
    // The list of User from which to select
    users: IUser[];

    addressId: number;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected addressService: AddressService,
        protected parentService: ParentService,
        protected teacherService: TeacherService,
        protected userProfileService: UserProfileService,
        protected activatedRoute: ActivatedRoute,
        protected userService: UserService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.addressId = this.activatedRoute.snapshot.params['addressId'];
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
        });
        this.addressService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAddress[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAddress[]>) => response.body)
            )
            .subscribe((res: IAddress[]) => (this.addresses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.parentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IParent[]>) => mayBeOk.ok),
                map((response: HttpResponse<IParent[]>) => response.body)
            )
            .subscribe((res: IParent[]) => (this.parents = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.teacherService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeacher[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeacher[]>) => response.body)
            )
            .subscribe((res: ITeacher[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.userProfileService.update(this.userProfile));
        } else {
            this.userProfile.homeAddressId = this.addressId;
            this.subscribeToSaveResponse(this.userProfileService.create(this.userProfile));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>) {
        result.subscribe((res: HttpResponse<IUserProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddress) {
        return item.id;
    }

    trackParentById(index: number, item: IParent) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    get userProfile() {
        return this._userProfile;
    }

    set userProfile(userProfile: IUserProfile) {
        this._userProfile = userProfile;
    }
}
