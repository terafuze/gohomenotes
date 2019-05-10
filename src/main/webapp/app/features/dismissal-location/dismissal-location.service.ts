import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';









@Injectable({ providedIn: 'root' })
export class DismissalLocationService {

    private resourceUrl =  SERVER_API_URL + 'api/dismissal-locations';

    constructor(private http: HttpClient) { }

    create(dismissalLocation: IDismissalLocation): Observable<HttpResponse<IDismissalLocation>> {
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
        return this.http.get<IDismissalLocation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
