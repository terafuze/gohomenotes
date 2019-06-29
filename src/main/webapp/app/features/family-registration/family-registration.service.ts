import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFamilyRegistration } from 'app/shared/model/family-registration.model';
import { IParentRegistration } from 'app/shared/model/parent-registration.model';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';

@Injectable({ providedIn: 'root' })
export class FamilyRegistrationService {
    private resourceUrl = SERVER_API_URL + 'api/family-registrations';

    constructor(private http: HttpClient) {}

    create(familyRegistration: IFamilyRegistration): Observable<HttpResponse<IFamilyRegistration>> {
        return this.http.post<IFamilyRegistration>(this.resourceUrl, familyRegistration, { observe: 'response' });
    }

    update(familyRegistration: IFamilyRegistration): Observable<HttpResponse<IFamilyRegistration>> {
        return this.http.put<IFamilyRegistration>(this.resourceUrl, familyRegistration, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IFamilyRegistration>> {
        return this.http.get<IFamilyRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IFamilyRegistration[]>> {
        const options = createRequestOption(req);
        return this.http.get<IFamilyRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    getParentRegistrations(id: number): Observable<HttpResponse<IParentRegistration[]>> {
        return this.http.get<IParentRegistration[]>(`${this.resourceUrl}/${id}/parent-registrations`, { observe: 'response' });
    }
    getStudentRegistrations(id: number): Observable<HttpResponse<IStudentRegistration[]>> {
        return this.http.get<IStudentRegistration[]>(`${this.resourceUrl}/${id}/student-registrations`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
