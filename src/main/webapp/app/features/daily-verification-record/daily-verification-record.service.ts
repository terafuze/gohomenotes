import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDailyVerificationRecord } from 'app/shared/model/daily-verification-record.model';




@Injectable({ providedIn: 'root' })
export class DailyVerificationRecordService {

    private resourceUrl =  SERVER_API_URL + 'api/daily-verification-records';

    constructor(private http: HttpClient) { }

    create(dailyVerificationRecord: IDailyVerificationRecord): Observable<HttpResponse<IDailyVerificationRecord>> {
        return this.http.post<IDailyVerificationRecord>(this.resourceUrl, dailyVerificationRecord, { observe: 'response' });
    }

    update(dailyVerificationRecord: IDailyVerificationRecord): Observable<HttpResponse<IDailyVerificationRecord>> {
        return this.http.put<IDailyVerificationRecord>(this.resourceUrl, dailyVerificationRecord, { observe: 'response' });
    }

    find(id: number): Observable<HttpResponse<IDailyVerificationRecord>> {
        return this.http.get<IDailyVerificationRecord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IDailyVerificationRecord[]>> {
        const options = createRequestOption(req);
        return this.http.get<IDailyVerificationRecord[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
