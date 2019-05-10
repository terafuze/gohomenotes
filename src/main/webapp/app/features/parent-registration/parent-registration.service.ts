import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParentRegistration } from 'app/shared/model/parent-registration.model';









@Injectable({ providedIn: 'root' })
export class ParentRegistrationService {

    private resourceUrl =  SERVER_API_URL + 'api/parent-registrations';

    constructor(private http: HttpClient) { }

    create(parentRegistration: IParentRegistration): Observable<HttpResponse<IParentRegistration>> {
        return this.http.post<IParentRegistration>(this.resourceUrl, parentRegistration, { observe: 'response' });
    }

    update(parentRegistration: IParentRegistration): Observable<HttpResponse<IParentRegistration>> {
        return this.http.put<IParentRegistration>(this.resourceUrl, parentRegistration, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IParentRegistration>> {
        return this.http.get<IParentRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IParentRegistration[]>> {
        const options = createRequestOption(req);
        return this.http.get<IParentRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
