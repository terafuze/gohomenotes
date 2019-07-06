import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGoHomeNotesReport } from 'app/shared/model/go-home-notes-report.model';

@Injectable({ providedIn: 'root' })
export class GoHomeNotesReportService {
  private resourceUrl = SERVER_API_URL + 'api/go-home-notes-reports';

  constructor(private http: HttpClient) {}

  create(goHomeNotesReport: IGoHomeNotesReport): Observable<HttpResponse<IGoHomeNotesReport>> {
    return this.http.post<IGoHomeNotesReport>(this.resourceUrl, goHomeNotesReport, { observe: 'response' });
  }

  update(goHomeNotesReport: IGoHomeNotesReport): Observable<HttpResponse<IGoHomeNotesReport>> {
    return this.http.put<IGoHomeNotesReport>(this.resourceUrl, goHomeNotesReport, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<IGoHomeNotesReport>> {
    return this.http.get<IGoHomeNotesReport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IGoHomeNotesReport[]>> {
    const options = createRequestOption(req);
    return this.http.get<IGoHomeNotesReport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
