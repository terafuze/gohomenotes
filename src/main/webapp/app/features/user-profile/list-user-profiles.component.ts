import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
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
    parentId: number;

    constructor(
        protected userProfileService: UserProfileService,
        protected addressService: AddressService,
        private teacherService: TeacherService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
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
        this.parentId = this.activatedRoute.snapshot.queryParams['parentId'];
        this.loadAll();
        this.accountService.identity().then(account => {
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
