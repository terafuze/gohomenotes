import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserProfile } from 'app/shared/model/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private resourceUrl = SERVER_API_URL + 'api/user-profiles';

  constructor(private http: HttpClient) {}

  create(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
    return this.http.post<IUserProfile>(this.resourceUrl, userProfile, { observe: 'response' });
  }

  update(userProfile: IUserProfile): Observable<HttpResponse<IUserProfile>> {
    return this.http.put<IUserProfile>(this.resourceUrl, userProfile, { observe: 'response' });
  }

  find(id: number): Observable<HttpResponse<IUserProfile>> {
    return this.http.get<IUserProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  forCurrentUser(): Observable<HttpResponse<IUserProfile>> {
    return this.http.get<IUserProfile>(`${this.resourceUrl}/current-user`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<IUserProfile[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUserProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
