import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEarlyPickupRequest } from 'app/shared/model/early-pickup-request.model';

@Injectable({ providedIn: 'root' })
export class EarlyPickupRequestService {
  private resourceUrl = SERVER_API_URL + 'api/early-pickup-requests';

  constructor(private http: HttpClient) {}

  create(earlyPickupRequest: IEarlyPickupRequest): Observable<HttpResponse<IEarlyPickupRequest>> {
    return this.http.post<IEarlyPickupRequest>(this.resourceUrl, earlyPickupRequest, { observe: 'response' });
  }

  update(earlyPickupRequest: IEarlyPickupRequest): Observable<HttpResponse<IEarlyPickupRequest>> {
    return this.http.put<IEarlyPickupRequest>(this.resourceUrl, earlyPickupRequest, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<IEarlyPickupRequest>> {
    return this.http.get<IEarlyPickupRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IEarlyPickupRequest[]>> {
    const options = createRequestOption(req);
    return this.http.get<IEarlyPickupRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
