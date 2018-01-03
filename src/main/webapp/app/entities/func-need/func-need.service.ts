import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { FuncNeed } from './func-need.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FuncNeedService {

    private resourceUrl = SERVER_API_URL + 'api/func-needs';

    constructor(private http: Http) { }

    create(funcNeed: FuncNeed): Observable<FuncNeed> {
        const copy = this.convert(funcNeed);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(funcNeed: FuncNeed): Observable<FuncNeed> {
        const copy = this.convert(funcNeed);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<FuncNeed> {
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
     * Convert a returned JSON object to FuncNeed.
     */
    private convertItemFromServer(json: any): FuncNeed {
        const entity: FuncNeed = Object.assign(new FuncNeed(), json);
        return entity;
    }

    /**
     * Convert a FuncNeed to a JSON which can be sent to the server.
     */
    private convert(funcNeed: FuncNeed): FuncNeed {
        const copy: FuncNeed = Object.assign({}, funcNeed);
        return copy;
    }
}
