import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';
import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class SchoolGradeService {

    private resourceUrl =  SERVER_API_URL + 'api/school-grades';

    constructor(private http: HttpClient, private userContext: UserContext) { }

    create(schoolGrade: ISchoolGrade): Observable<HttpResponse<ISchoolGrade>> {
        schoolGrade.schoolId = this.userContext.schoolId;
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
        const schoolId = this.userContext.schoolId;
        return this.http.get<ISchoolGrade[]>(`api/schools/${schoolId}/school-grades`, { params: options, observe: 'response' });
    }

    getStudentRegistrations(id: number): Observable<HttpResponse<IStudentRegistration[]>> {
        return this.http.get<IStudentRegistration[]>(`${this.resourceUrl}/${id}/student-registrations`, { observe: 'response' });
    }
    getStudents(id: number): Observable<HttpResponse<IStudent[]>> {
        return this.http.get<IStudent[]>(`${this.resourceUrl}/${id}/students`, { observe: 'response' });
    }
    getTeachers(id: number): Observable<HttpResponse<ITeacher[]>> {
        return this.http.get<ITeacher[]>(`${this.resourceUrl}/${id}/teachers`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
