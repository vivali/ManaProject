import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TnDesc } from './tn-desc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TnDescService {

    private resourceUrl = SERVER_API_URL + 'api/tn-descs';

    constructor(private http: Http) { }

    create(tnDesc: TnDesc): Observable<TnDesc> {
        const copy = this.convert(tnDesc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tnDesc: TnDesc): Observable<TnDesc> {
        const copy = this.convert(tnDesc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TnDesc> {
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
     * Convert a returned JSON object to TnDesc.
     */
    private convertItemFromServer(json: any): TnDesc {
        const entity: TnDesc = Object.assign(new TnDesc(), json);
        return entity;
    }

    /**
     * Convert a TnDesc to a JSON which can be sent to the server.
     */
    private convert(tnDesc: TnDesc): TnDesc {
        const copy: TnDesc = Object.assign({}, tnDesc);
        return copy;
    }
}
