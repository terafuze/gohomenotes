import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';




@Injectable({ providedIn: 'root' })
export class AfterSchoolProgramService {

    private resourceUrl =  SERVER_API_URL + 'api/after-school-programs';

    constructor(private http: HttpClient) { }

    create(afterSchoolProgram: IAfterSchoolProgram): Observable<HttpResponse<IAfterSchoolProgram>> {
        return this.http.post<IAfterSchoolProgram>(this.resourceUrl, afterSchoolProgram, { observe: 'response' });
    }

    update(afterSchoolProgram: IAfterSchoolProgram): Observable<HttpResponse<IAfterSchoolProgram>> {
        return this.http.put<IAfterSchoolProgram>(this.resourceUrl, afterSchoolProgram, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IAfterSchoolProgram>> {
        return this.http.get<IAfterSchoolProgram>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IAfterSchoolProgram[]>> {
        const options = createRequestOption(req);
        return this.http.get<IAfterSchoolProgram[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
