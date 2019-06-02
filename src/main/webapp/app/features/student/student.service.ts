import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudent } from 'app/shared/model/student.model';
import { IParent } from 'app/shared/model/parent.model';
import { ISchool } from 'app/shared/model/school.model';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class StudentService {

    private resourceUrl =  SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient, private userContext: UserContext) { }

    create(student: IStudent): Observable<HttpResponse<IStudent>> {
        student.schoolId = this.userContext.schoolId;
        return this.http.post<IStudent>(this.resourceUrl, student, { observe: 'response' });
    }

    update(student: IStudent): Observable<HttpResponse<IStudent>> {
        return this.http.put<IStudent>(this.resourceUrl, student, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IStudent>> {
        return this.http.get<IStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IStudent[]>> {
        const options = createRequestOption(req);
        const schoolId = this.userContext.schoolId;
        return this.http.get<IStudent[]>(`api/schools/${schoolId}/students`, { params: options, observe: 'response' });
    }

    getParents(id: number): Observable<HttpResponse<IParent[]>> {
        return this.http.get<IParent[]>(`${this.resourceUrl}/${id}/parents`, { observe: 'response' });
    }
    getSchools(id: number): Observable<HttpResponse<ISchool[]>> {
        return this.http.get<ISchool[]>(`${this.resourceUrl}/${id}/schools`, { observe: 'response' });
    }
    getSchoolGrades(id: number): Observable<HttpResponse<ISchoolGrade[]>> {
        return this.http.get<ISchoolGrade[]>(`${this.resourceUrl}/${id}/school-grades`, { observe: 'response' });
    }
    getTeachers(id: number): Observable<HttpResponse<ITeacher[]>> {
        return this.http.get<ITeacher[]>(`${this.resourceUrl}/${id}/teachers`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
