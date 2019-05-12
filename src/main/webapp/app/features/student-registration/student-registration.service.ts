import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IStudentRegistration } from 'app/shared/model/student-registration.model';


@Injectable({ providedIn: 'root' })
export class StudentRegistrationService {

    private resourceUrl =  SERVER_API_URL + 'api/student-registrations';

    constructor(private http: HttpClient) { }

    create(studentRegistration: IStudentRegistration): Observable<HttpResponse<IStudentRegistration>> {
        return this.http.post<IStudentRegistration>(this.resourceUrl, studentRegistration, { observe: 'response' });
    }

    update(studentRegistration: IStudentRegistration): Observable<HttpResponse<IStudentRegistration>> {
        return this.http.put<IStudentRegistration>(this.resourceUrl, studentRegistration, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IStudentRegistration>> {
        return this.http.get<IStudentRegistration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IStudentRegistration[]>> {
        const options = createRequestOption(req);
        return this.http.get<IStudentRegistration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
