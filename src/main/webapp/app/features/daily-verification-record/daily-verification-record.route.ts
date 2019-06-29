import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';
import { DailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';
import { DailyVerificationRecordService } from './daily-verification-record.service';
import { DeleteDailyVerificationRecordPopupComponent } from './delete-daily-verification-record.component';
import { EditDailyVerificationRecordComponent } from './edit-daily-verification-record.component';
import { ListDailyVerificationRecordsComponent } from './list-daily-verification-records.component';
import { ViewDailyVerificationRecordComponent } from './view-daily-verification-record.component';

@Injectable({ providedIn: 'root' })
export class DailyVerificationRecordResolve implements Resolve<IDailyVerificationRecord> {
    constructor(private service: DailyVerificationRecordService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDailyVerificationRecord> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DailyVerificationRecord>) => response.ok),
                map((dailyVerificationRecord: HttpResponse<DailyVerificationRecord>) => dailyVerificationRecord.body)
            );
        }
        return of(new DailyVerificationRecord());
    }
}

export const dailyVerificationRecordRoute: Routes = [
    {
        path: 'daily-verification-record/new',
        component: EditDailyVerificationRecordComponent,
        resolve: {
            dailyVerificationRecord: DailyVerificationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dailyVerificationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'daily-verification-records',
        component: ListDailyVerificationRecordsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dailyVerificationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'daily-verification-records/:id/view',
        component: ViewDailyVerificationRecordComponent,
        resolve: {
            dailyVerificationRecord: DailyVerificationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dailyVerificationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'daily-verification-records/:id/edit',
        component: EditDailyVerificationRecordComponent,
        resolve: {
            dailyVerificationRecord: DailyVerificationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dailyVerificationRecord.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dailyVerificationRecordPopupRoute: Routes = [
    {
        path: 'daily-verification-record/:id/delete',
        component: DeleteDailyVerificationRecordPopupComponent,
        resolve: {
            dailyVerificationRecord: DailyVerificationRecordResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'app.dailyVerificationRecord.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
