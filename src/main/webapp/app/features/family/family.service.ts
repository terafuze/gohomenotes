import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFamily } from 'app/shared/model/family.model';
import { IStudent } from 'app/shared/model/student.model';

import { IParent } from 'app/shared/model/parent.model';



@Injectable({ providedIn: 'root' })
export class FamilyService {

    private resourceUrl =  SERVER_API_URL + 'api/families';

    constructor(private http: HttpClient) { }

    create(family: IFamily): Observable<HttpResponse<IFamily>> {
        return this.http.post<IFamily>(this.resourceUrl, family, { observe: 'response' });
    }

    update(family: IFamily): Observable<HttpResponse<IFamily>> {
        return this.http.put<IFamily>(this.resourceUrl, family, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IFamily>> {
        return this.http.get<IFamily>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IFamily[]>> {
        const options = createRequestOption(req);
        return this.http.get<IFamily[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    getStudents(id: number): Observable<HttpResponse<IStudent[]>> {
        return this.http.get<IStudent[]>(`${this.resourceUrl}/${id}/students`, { observe: 'response' });
    }
    getParents(id: number): Observable<HttpResponse<IParent[]>> {
        return this.http.get<IParent[]>(`${this.resourceUrl}/${id}/parents`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
