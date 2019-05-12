import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddress } from 'app/shared/model/address.model';
import { IUserProfile } from 'app/shared/model/user-profile.model';


@Injectable({ providedIn: 'root' })
export class AddressService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) { }

    create(address: IAddress): Observable<HttpResponse<IAddress>> {
        return this.http.post<IAddress>(this.resourceUrl, address, { observe: 'response' });
    }

    update(address: IAddress): Observable<HttpResponse<IAddress>> {
        return this.http.put<IAddress>(this.resourceUrl, address, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IAddress>> {
        return this.http.get<IAddress>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IAddress[]>> {
        const options = createRequestOption(req);
        return this.http.get<IAddress[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    getUserProfiles(id: number): Observable<HttpResponse<IUserProfile[]>> {
        return this.http.get<IUserProfile[]>(`${this.resourceUrl}/${id}/user-profiles`, { observe: 'response' });
    }
    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
