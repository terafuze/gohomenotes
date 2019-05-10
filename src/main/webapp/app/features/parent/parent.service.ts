import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IParent } from 'app/shared/model/parent.model';









@Injectable({ providedIn: 'root' })
export class ParentService {

    private resourceUrl =  SERVER_API_URL + 'api/parents';

    constructor(private http: HttpClient) { }

    create(parent: IParent): Observable<HttpResponse<IParent>> {
        return this.http.post<IParent>(this.resourceUrl, parent, { observe: 'response' });
    }

    update(parent: IParent): Observable<HttpResponse<IParent>> {
        return this.http.put<IParent>(this.resourceUrl, parent, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IParent>> {
        return this.http.get<IParent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IParent[]>> {
        const options = createRequestOption(req);
        return this.http.get<IParent[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
