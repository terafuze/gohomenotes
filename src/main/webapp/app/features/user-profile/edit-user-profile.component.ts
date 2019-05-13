import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';

import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/features/address';
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

    // The list of Address from which to select
    addresses: IAddress[];
    // The list of Teacher from which to select
    teachers: ITeacher[];
    // The list of User from which to select
    users: IUser[];

    addressId: number;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressService,
        private teacherService: TeacherService,
        private userProfileService: UserProfileService,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.addressId = this.activatedRoute.snapshot.params['addressId'];
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
        });
        this.addressService.query().subscribe(
            (res: HttpResponse<IAddress[]>) => {
                this.addresses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.teacherService.query().subscribe(
            (res: HttpResponse<ITeacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        // this.teacherService.query({ filter: 'user-profile-is-null' }).subscribe(
        //     (res: HttpResponse<ITeacher[]>) => {
        //         if (!this.userProfile.teacherId) {
        //             this.teachers = res.body;
        //         } else {
        //             this.teacherService.find(this.userProfile.teacherId).subscribe(
        //                 (subRes: HttpResponse<ITeacher>) => {
        //                     this.teachers = [subRes.body].concat(res.body);
        //                 },
        //                 (subRes: HttpErrorResponse) => this.onError(subRes.message)
        //             );
        //         }
        //     },
        //     (res: HttpErrorResponse) => this.onError(res.message)
        // );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>) {
        result.subscribe((res: HttpResponse<IUserProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAddressById(index: number, item: IAddress) {
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
