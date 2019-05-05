import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';




@Injectable({ providedIn: 'root' })
export class SchoolGradeService {

    private resourceUrl =  SERVER_API_URL + 'api/school-grades';

    constructor(private http: HttpClient) { }

    create(schoolGrade: ISchoolGrade): Observable<HttpResponse<ISchoolGrade>> {
        return this.http.post<ISchoolGrade>(this.resourceUrl, schoolGrade, { observe: 'response' });
    }

    update(schoolGrade: ISchoolGrade): Observable<HttpResponse<ISchoolGrade>> {
        return this.http.put<ISchoolGrade>(this.resourceUrl, schoolGrade, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<ISchoolGrade>> {
        return this.http.get<ISchoolGrade>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ISchoolGrade[]>> {
        const options = createRequestOption(req);
        return this.http.get<ISchoolGrade[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
