import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class DismissalLocationService {
  private resourceUrl = SERVER_API_URL + 'api/dismissal-locations';

  constructor(protected http: HttpClient, private userContext: UserContext) {}

  create(dismissalLocation: IDismissalLocation): Observable<HttpResponse<IDismissalLocation>> {
    dismissalLocation.schoolId = this.userContext.schoolId;
    return this.http.post<IDismissalLocation>(this.resourceUrl, dismissalLocation, { observe: 'response' });
  }

  update(dismissalLocation: IDismissalLocation): Observable<HttpResponse<IDismissalLocation>> {
    return this.http.put<IDismissalLocation>(this.resourceUrl, dismissalLocation, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<IDismissalLocation>> {
    return this.http.get<IDismissalLocation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IDismissalLocation[]>> {
    const options = createRequestOption(req);
    const schoolId = this.userContext.schoolId;
    return this.http.get<IDismissalLocation[]>(`api/schools/${schoolId}/dismissal-locations`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
