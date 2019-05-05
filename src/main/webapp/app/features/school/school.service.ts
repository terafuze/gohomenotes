import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchool } from 'app/shared/model/school.model';





import { IStudent } from 'app/shared/model/student.model';



@Injectable({ providedIn: 'root' })
export class SchoolService {

    private resourceUrl =  SERVER_API_URL + 'api/schools';

    constructor(private http: HttpClient) { }

    create(school: ISchool): Observable<HttpResponse<ISchool>> {
        return this.http.post<ISchool>(this.resourceUrl, school, { observe: 'response' });
    }

    update(school: ISchool): Observable<HttpResponse<ISchool>> {
        return this.http.put<ISchool>(this.resourceUrl, school, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<ISchool>> {
        return this.http.get<ISchool>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ISchool[]>> {
        const options = createRequestOption(req);
        return this.http.get<ISchool[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    getStudents(id: number): Observable<HttpResponse<IStudent[]>> {
        return this.http.get<IStudent[]>(`${this.resourceUrl}/${id}/students`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
