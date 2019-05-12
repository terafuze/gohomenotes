import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';
import { AddressService } from '../address/address.service';
import { TeacherService } from '../teacher/teacher.service';
@Component({
    selector: 'app-list-user-profiles',
    templateUrl: './list-user-profiles.component.html'
})
export class ListUserProfilesComponent implements OnInit, OnDestroy {
    userProfiles: IUserProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;
    addressId: number;
    teacherId: number;
    

    constructor(
        private userProfileService: UserProfileService,
        private addressService: AddressService,
        private teacherService: TeacherService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        if (this.addressId) {
            this.addressService.getUserProfiles(this.addressId).subscribe(
                (res: HttpResponse<IUserProfile[]>) => {
                    this.userProfiles = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
            dataLoaded = true;
        }

        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.userProfileService.query().subscribe(
                (res: HttpResponse<IUserProfile[]>) => {
                    this.userProfiles = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.addressId = this.activatedRoute.snapshot.queryParams['addressId'];
        this.teacherId = this.activatedRoute.snapshot.queryParams['teacherId'];
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserProfile) {
        return item.id;
    }

    registerChangeInUserProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('userProfileListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
