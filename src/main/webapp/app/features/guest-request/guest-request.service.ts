import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGuestRequest } from 'app/shared/model/guest-request.model';

@Injectable({ providedIn: 'root' })
export class GuestRequestService {
    private resourceUrl = SERVER_API_URL + 'api/guest-requests';

    constructor(private http: HttpClient) {}

    create(guestRequest: IGuestRequest): Observable<HttpResponse<IGuestRequest>> {
        return this.http.post<IGuestRequest>(this.resourceUrl, guestRequest, { observe: 'response' });
    }

    update(guestRequest: IGuestRequest): Observable<HttpResponse<IGuestRequest>> {
        return this.http.put<IGuestRequest>(this.resourceUrl, guestRequest, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IGuestRequest>> {
        return this.http.get<IGuestRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IGuestRequest[]>> {
        const options = createRequestOption(req);
        return this.http.get<IGuestRequest[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
