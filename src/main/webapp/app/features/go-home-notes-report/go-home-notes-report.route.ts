import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';
import { GoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';
import { GoHomeNotesReportService } from './go-home-notes-report.service';
import { DeleteGoHomeNotesReportPopupComponent } from './delete-go-home-notes-report.component';
import { EditGoHomeNotesReportComponent } from './edit-go-home-notes-report.component';
import { ListGoHomeNotesReportsComponent } from './list-go-home-notes-reports.component';
import { ViewGoHomeNotesReportComponent } from './view-go-home-notes-report.component';

@Injectable({ providedIn: 'root' })
export class GoHomeNotesReportResolve implements Resolve<IGoHomeNotesReport> {
  constructor(private service: GoHomeNotesReportService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGoHomeNotesReport> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GoHomeNotesReport>) => response.ok),
        map((goHomeNotesReport: HttpResponse<GoHomeNotesReport>) => goHomeNotesReport.body)
      );
    }
    return of(new GoHomeNotesReport());
  }
}

export const goHomeNotesReportRoute: Routes = [
  {
    path: 'go-home-notes-report/new',
    component: EditGoHomeNotesReportComponent,
    resolve: {
      goHomeNotesReport: GoHomeNotesReportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.goHomeNotesReport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'go-home-notes-reports',
    component: ListGoHomeNotesReportsComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.goHomeNotesReport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'go-home-notes-reports/:id/view',
    component: ViewGoHomeNotesReportComponent,
    resolve: {
      goHomeNotesReport: GoHomeNotesReportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.goHomeNotesReport.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'go-home-notes-reports/:id/edit',
    component: EditGoHomeNotesReportComponent,
    resolve: {
      goHomeNotesReport: GoHomeNotesReportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.goHomeNotesReport.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const goHomeNotesReportPopupRoute: Routes = [
  {
    path: 'go-home-notes-report/:id/delete',
    component: DeleteGoHomeNotesReportPopupComponent,
    resolve: {
      goHomeNotesReport: GoHomeNotesReportResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'app.goHomeNotesReport.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
