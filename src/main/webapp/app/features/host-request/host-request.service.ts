import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHostRequest } from 'app/shared/model/host-request.model';









@Injectable({ providedIn: 'root' })
export class HostRequestService {

    private resourceUrl =  SERVER_API_URL + 'api/host-requests';

    constructor(private http: HttpClient) { }

    create(hostRequest: IHostRequest): Observable<HttpResponse<IHostRequest>> {
        return this.http.post<IHostRequest>(this.resourceUrl, hostRequest, { observe: 'response' });
    }

    update(hostRequest: IHostRequest): Observable<HttpResponse<IHostRequest>> {
        return this.http.put<IHostRequest>(this.resourceUrl, hostRequest, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IHostRequest>> {
        return this.http.get<IHostRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IHostRequest[]>> {
        const options = createRequestOption(req);
        return this.http.get<IHostRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
