import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportationChangeRequest } from 'app/shared/model/transportation-change-request.model';

@Injectable({ providedIn: 'root' })
export class TransportationChangeRequestService {
  private resourceUrl = SERVER_API_URL + 'api/transportation-change-requests';

  constructor(private http: HttpClient) {}

  create(transportationChangeRequest: ITransportationChangeRequest): Observable<HttpResponse<ITransportationChangeRequest>> {
    return this.http.post<ITransportationChangeRequest>(this.resourceUrl, transportationChangeRequest, { observe: 'response' });
  }

  update(transportationChangeRequest: ITransportationChangeRequest): Observable<HttpResponse<ITransportationChangeRequest>> {
    return this.http.put<ITransportationChangeRequest>(this.resourceUrl, transportationChangeRequest, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<ITransportationChangeRequest>> {
    return this.http.get<ITransportationChangeRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<ITransportationChangeRequest[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITransportationChangeRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
