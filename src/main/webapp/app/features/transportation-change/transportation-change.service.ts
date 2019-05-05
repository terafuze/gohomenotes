import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransportationChange } from 'app/shared/model/transportation-change.model';


@Injectable({ providedIn: 'root' })
export class TransportationChangeService {

    private resourceUrl =  SERVER_API_URL + 'api/transportation-changes';

    constructor(private http: HttpClient) { }

    create(transportationChange: ITransportationChange): Observable<HttpResponse<ITransportationChange>> {
        return this.http.post<ITransportationChange>(this.resourceUrl, transportationChange, { observe: 'response' });
    }

    update(transportationChange: ITransportationChange): Observable<HttpResponse<ITransportationChange>> {
        return this.http.put<ITransportationChange>(this.resourceUrl, transportationChange, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<ITransportationChange>> {
        return this.http.get<ITransportationChange>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ITransportationChange[]>> {
        const options = createRequestOption(req);
        return this.http.get<ITransportationChange[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
