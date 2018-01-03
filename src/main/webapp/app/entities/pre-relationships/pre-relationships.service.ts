import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { PreRelationships } from './pre-relationships.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PreRelationshipsService {

    private resourceUrl = SERVER_API_URL + 'api/pre-relationships';

    constructor(private http: Http) { }

    create(preRelationships: PreRelationships): Observable<PreRelationships> {
        const copy = this.convert(preRelationships);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(preRelationships: PreRelationships): Observable<PreRelationships> {
        const copy = this.convert(preRelationships);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<PreRelationships> {
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
     * Convert a returned JSON object to PreRelationships.
     */
    private convertItemFromServer(json: any): PreRelationships {
        const entity: PreRelationships = Object.assign(new PreRelationships(), json);
        return entity;
    }

    /**
     * Convert a PreRelationships to a JSON which can be sent to the server.
     */
    private convert(preRelationships: PreRelationships): PreRelationships {
        const copy: PreRelationships = Object.assign({}, preRelationships);
        return copy;
    }
}
