import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
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
    protected addressService: AddressService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {}

  loadAll() {
    this.addressService.query().subscribe(
      (res: HttpResponse<IAddress[]>) => {
        this.addresses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
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

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
