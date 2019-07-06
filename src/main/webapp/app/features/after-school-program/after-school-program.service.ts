import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAfterSchoolProgram } from 'app/shared/model/after-school-program.model';
import { UserContext } from 'app/core';

@Injectable({ providedIn: 'root' })
export class AfterSchoolProgramService {
  private resourceUrl = SERVER_API_URL + 'api/after-school-programs';

  constructor(protected http: HttpClient, private userContext: UserContext) {}

  create(afterSchoolProgram: IAfterSchoolProgram): Observable<HttpResponse<IAfterSchoolProgram>> {
    afterSchoolProgram.schoolId = this.userContext.schoolId;
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
    const schoolId = this.userContext.schoolId;
    return this.http.get<IAfterSchoolProgram[]>(`api/schools/${schoolId}/after-school-programs`, {
      params: options,
      observe: 'response'
    });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
