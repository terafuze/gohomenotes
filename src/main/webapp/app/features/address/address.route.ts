import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAddress } from 'app/shared/model/address.model';
import { Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { DeleteAddressPopupComponent } from './delete-address.component';
import { GoHomeNotesEditAddressComponent } from './edit-address.component';
import { GoHomeNotesListAddressesComponent } from './list-addresses.component';
import { GoHomeNotesViewAddressComponent } from './view-address.component';

@Injectable({ providedIn: 'root' })
export class AddressResolve implements Resolve<IAddress> {
  constructor(private service: AddressService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAddress> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Address>) => response.ok),
        map((address: HttpResponse<Address>) => address.body)
      );
    }
    return of(new Address());
  }
}

export const addressRoute: Routes = [
  {
    path: 'addresses',
    component: GoHomeNotesListAddressesComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.address.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'addresses/:id/view',
    component: GoHomeNotesViewAddressComponent,
    resolve: {
      address: AddressResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.address.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const addressPopupRoute: Routes = [
  {
    path: 'address/:id/delete',
    component: DeleteAddressPopupComponent,
    resolve: {
      address: AddressResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.address.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
