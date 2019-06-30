import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISchool } from 'app/shared/model/school.model';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { IDismissalLocation } from 'app/shared/model/dismissal-location.model';
import { ISchoolGrade } from 'app/shared/model/school-grade.model';
import { IStudent, Student } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';

@Injectable({ providedIn: 'root' })
export class SchoolService {
    private resourceUrl = SERVER_API_URL + 'api/schools';

    constructor(private http: HttpClient) {}

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

    getAfterSchoolPrograms(id: number): Observable<HttpResponse<IAfterSchoolProgram[]>> {
        return this.http.get<IAfterSchoolProgram[]>(`${this.resourceUrl}/${id}/after-school-programs`, { observe: 'response' });
    }
    getDismissalLocations(id: number): Observable<HttpResponse<IDismissalLocation[]>> {
        return this.http.get<IDismissalLocation[]>(`${this.resourceUrl}/${id}/dismissal-locations`, { observe: 'response' });
    }
    getSchoolGrades(id: number): Observable<HttpResponse<ISchoolGrade[]>> {
        return this.http.get<ISchoolGrade[]>(`${this.resourceUrl}/${id}/school-grades`, { observe: 'response' });
    }
    getStudents(id: number): Observable<HttpResponse<IStudent[]>> {
        return this.http
            .get<IStudent[]>(`${this.resourceUrl}/${id}/students`, { observe: 'response' })
            .pipe(map((res: HttpResponse<IStudent[]>) => this.deriveTeacherIdentifierFromArray(res)));
    }

    deriveTeacherIdentifierFromArray(res: HttpResponse<IStudent[]>): HttpResponse<IStudent[]> {
        res.body.forEach((student: IStudent) => {
            student = Student.deriveTeacherIdentifier(student);
        });
        return res;
    }

    getTeachers(id: number): Observable<HttpResponse<ITeacher[]>> {
        return this.http.get<ITeacher[]>(`${this.resourceUrl}/${id}/teachers`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
