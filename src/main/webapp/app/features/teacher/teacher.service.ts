import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITeacher } from 'app/shared/model/teacher.model';
import { IStudent } from 'app/shared/model/student.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class TeacherService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient, private userContext: UserContext) { }

    create(teacher: ITeacher): Observable<HttpResponse<ITeacher>> {
        teacher.schoolId = this.userContext.school.id;
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
        const schoolId = this.userContext.school.id;
        return this.http.get<ITeacher[]>(`api/schools/${schoolId}/teachers`, { params: options, observe: 'response' })
            .pipe(map((res: HttpResponse<ITeacher[]>) => this.deriveTeacherIdentifierFromArray(res)));
    }

    getStudents(id: number): Observable<HttpResponse<IStudent[]>> {
        return this.http.get<IStudent[]>(`${this.resourceUrl}/${id}/students`, { observe: 'response' });
    }
    
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    deriveTeacherIdentifierFromArray(res: HttpResponse<ITeacher[]>): HttpResponse<ITeacher[]> {
        res.body.forEach((teacher: ITeacher) => {
            teacher.identifier = teacher.lastName + ", " + teacher.firstName;
        });
        return res;
    }

}
