import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Version } from './version.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VersionService {

    private resourceUrl = SERVER_API_URL + 'api/versions';

    constructor(private http: Http) { }

    create(version: Version): Observable<Version> {
        const copy = this.convert(version);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(version: Version): Observable<Version> {
        const copy = this.convert(version);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Version> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Version.
     */
    private convertItemFromServer(json: any): Version {
        const entity: Version = Object.assign(new Version(), json);
        return entity;
    }

    /**
     * Convert a Version to a JSON which can be sent to the server.
     */
    private convert(version: Version): Version {
        const copy: Version = Object.assign({}, version);
        return copy;
    }
}
