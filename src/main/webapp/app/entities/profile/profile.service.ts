import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Profile } from './profile.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProfileService {

    private resourceUrl = SERVER_API_URL + 'api/profiles';

    constructor(private http: Http) { }

    create(profile: Profile): Observable<Profile> {
        const copy = this.convert(profile);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(profile: Profile): Observable<Profile> {
        const copy = this.convert(profile);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Profile> {
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
     * Convert a returned JSON object to Profile.
     */
    private convertItemFromServer(json: any): Profile {
        const entity: Profile = Object.assign(new Profile(), json);
        return entity;
    }

    /**
     * Convert a Profile to a JSON which can be sent to the server.
     */
    private convert(profile: Profile): Profile {
        const copy: Profile = Object.assign({}, profile);
        return copy;
    }
}
