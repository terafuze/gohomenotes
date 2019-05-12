import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';

import { Principal } from 'app/core';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
@Component({
    selector: 'app-list-addresses',
    templateUrl: './list-addresses.component.html'
})
export class ListAddressesComponent implements OnInit, OnDestroy {
    addresses: IAddress[];
    currentAccount: any;
    eventSubscriber: Subscription;
    

    constructor(
        private addressService: AddressService,
        private activatedRoute: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        let dataLoaded: boolean = false;
        // If no items loaded so far, then load all of them
        if (!dataLoaded) {
            this.addressService.query().subscribe(
                (res: HttpResponse<IAddress[]>) => {
                    this.addresses = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAddresses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAddress) {
        return item.id;
    }

    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
