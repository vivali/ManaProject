import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Role } from './role.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RoleService {

    private resourceUrl = SERVER_API_URL + 'api/roles';

    constructor(private http: Http) { }

    create(role: Role): Observable<Role> {
        const copy = this.convert(role);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(role: Role): Observable<Role> {
        const copy = this.convert(role);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Role> {
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
     * Convert a returned JSON object to Role.
     */
    private convertItemFromServer(json: any): Role {
        const entity: Role = Object.assign(new Role(), json);
        return entity;
    }

    /**
     * Convert a Role to a JSON which can be sent to the server.
     */
    private convert(role: Role): Role {
        const copy: Role = Object.assign({}, role);
        return copy;
    }
}
