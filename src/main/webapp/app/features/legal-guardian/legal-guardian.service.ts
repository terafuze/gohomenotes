import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILegalGuardian } from 'app/shared/model/legal-guardian.model';


@Injectable({ providedIn: 'root' })
export class LegalGuardianService {

    private resourceUrl =  SERVER_API_URL + 'api/legal-guardians';

    constructor(private http: HttpClient) { }

    create(legalGuardian: ILegalGuardian): Observable<HttpResponse<ILegalGuardian>> {
        return this.http.post<ILegalGuardian>(this.resourceUrl, legalGuardian, { observe: 'response' });
    }

    update(legalGuardian: ILegalGuardian): Observable<HttpResponse<ILegalGuardian>> {
        return this.http.put<ILegalGuardian>(this.resourceUrl, legalGuardian, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<ILegalGuardian>> {
        return this.http.get<ILegalGuardian>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ILegalGuardian[]>> {
        const options = createRequestOption(req);
        return this.http.get<ILegalGuardian[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
