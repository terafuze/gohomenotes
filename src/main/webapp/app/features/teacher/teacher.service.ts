import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacher } from 'app/shared/model/teacher.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class TeacherService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient, private userContext: UserContext) { }

    create(teacher: ITeacher): Observable<HttpResponse<ITeacher>> {
        teacher = this.userContext.school.id;
        return this.http.post<ITeacher>(this.resourceUrl, teacher, { observe: 'response' });
    }

    update(teacher: ITeacher): Observable<HttpResponse<ITeacher>> {
        return this.http.put<ITeacher>(this.resourceUrl, teacher, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<ITeacher>> {
        return this.http.get<ITeacher>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<ITeacher[]>> {
        const options = createRequestOption(req);
        var schoolId = this.userContext.school.id;
        return this.http.get<ITeacher[]>(`api/schools/${schoolId}/teachers`, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
