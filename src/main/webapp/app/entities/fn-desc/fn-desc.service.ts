import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { FnDesc } from './fn-desc.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FnDescService {

    private resourceUrl = SERVER_API_URL + 'api/fn-descs';

    constructor(private http: Http) { }

    create(fnDesc: FnDesc): Observable<FnDesc> {
        const copy = this.convert(fnDesc);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fnDesc: FnDesc): Observable<FnDesc> {
        const copy = this.convert(fnDesc);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FnDesc> {
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
     * Convert a returned JSON object to FnDesc.
     */
    private convertItemFromServer(json: any): FnDesc {
        const entity: FnDesc = Object.assign(new FnDesc(), json);
        return entity;
    }

    /**
     * Convert a FnDesc to a JSON which can be sent to the server.
     */
    private convert(fnDesc: FnDesc): FnDesc {
        const copy: FnDesc = Object.assign({}, fnDesc);
        return copy;
    }
}
