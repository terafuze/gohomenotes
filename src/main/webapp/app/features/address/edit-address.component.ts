import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from './address.service';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from 'app/features/user-profile';

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html'
})
export class EditAddressComponent implements OnInit {
    private _address: IAddress;

    isSaving: boolean;

    // The list of User Profiles from which to select
    userProfiles: IUserProfile[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected jhiDataUtils: JhiDataUtils,
        protected userProfileService: UserProfileService,
        protected addressService: AddressService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;

        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.userProfileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUserProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUserProfile[]>) => response.body)
            )
            .subscribe((res: IUserProfile[]) => (this.userProfiles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
        result.subscribe((res: HttpResponse<IAddress>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserProfileById(index: number, item: IUserProfile) {
        return item.id;
    }

    // TODO if not needed, remove this function
    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    get address() {
        return this._address;
    }

    set address(address: IAddress) {
        this._address = address;
    }
}
