import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../app.constants';

import { Project, ProjectService } from '../entities/project';
import { TechNeed, TechNeedService } from '../entities/tech-need';
import { TnDesc, TnDescService } from '../entities/tn-desc';
import { FuncNeed, FuncNeedService } from '../entities/func-need';
import { FnDesc, FnDescService } from '../entities/fn-desc';
import { Techno, TechnoService } from '../entities/techno';
import { Version, VersionService } from '../entities/version';
import { Role, RoleService } from '../entities/role';
import { Experience, ExperienceService } from '../entities/experience';
import { PreRelationships, PreRelationshipsService } from '../entities/pre-relationships';

import { ResponseWrapper, createRequestOption } from '../shared';

@Injectable()
export class AllProjectService {

    private resourceUrlProject = SERVER_API_URL + 'api/projects';
    private resourceUrlTechNeed = SERVER_API_URL + 'api/tech-needs';
    private resourceUrlTnDesc = SERVER_API_URL + 'api/tn-descs';
    private resourceUrlFuncNeed = SERVER_API_URL + 'api/func-needs';
    private resourceUrlFnDesc = SERVER_API_URL + 'api/fn-descs';
    private resourceUrlTechno = SERVER_API_URL + 'api/technos';
    private resourceUrlVersion = SERVER_API_URL + 'api/versions';
    private resourceUrlRole = SERVER_API_URL + 'api/roles';
    private resourceUrlExperience = SERVER_API_URL + 'api/experiences';
    private resourceUrlPreRelationships = SERVER_API_URL + 'api/pre-relationships';

    constructor(
        private http: Http,
        private projectService: ProjectService,
        private techNeedService: TechNeedService,
        private tnDescService: TnDescService,
        private funcNeedService: FuncNeedService,
        private fnDescService: FnDescService,
        private technoService: TechnoService,
        private versionService: VersionService,
        private roleService: RoleService,
        private experienceService: ExperienceService,
        private preRelationshipsService: PreRelationshipsService
    ) { }

    create(project?: Project, techNeed?: TechNeed, tnDesc?: TnDesc, funcNeed?: FuncNeed, fnDesc?: FnDesc, techno?: Techno,
        version?: Version, role?: Role, experience?: Experience, preRelationships?: PreRelationships) {
        this.techNeedService.create(techNeed);
        this.tnDescService.create(tnDesc);
        this.funcNeedService.create(funcNeed);
        this.fnDescService.create(fnDesc);
        this.versionService.create(version);
        this.roleService.create(role);
        this.technoService.create(techno);
        this.projectService.create(project);
        this.experienceService.create(experience);
        this.preRelationshipsService.create(preRelationships);
    }

    update(project?: Project, techNeed?: TechNeed, tnDesc?: TnDesc, funcNeed?: FuncNeed, fnDesc?: FnDesc, techno?: Techno,
        version?: Version, role?: Role, experience?: Experience, preRelationships?: PreRelationships) {
        this.techNeedService.update(techNeed);
        this.tnDescService.update(tnDesc);
        this.fnDescService.update(fnDesc);
        this.versionService.update(version);
        this.preRelationshipsService.update(preRelationships);
    }

    find(id?: number): Observable<Project> {
        return this.http.get(`${this.resourceUrlProject}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    queryProject(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlProject, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryTechNeed(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlTechNeed, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryTnDesc(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlTnDesc, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryFuncNeed(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlFuncNeed, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryFnDesc(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlFnDesc, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryTechno(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlTechno, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryVersion(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlVersion, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryRole(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlRole, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryExperience(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlExperience, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryPreRelationships(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrlPreRelationships, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number) {
        this.tnDescService.delete(id);
        this.fnDescService.delete(id);
        this.versionService.delete(id);
        this.preRelationshipsService.delete(id);
        return this.projectService.delete(id);
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
     * Convert a returned JSON object to Project.
     */
    private convertItemFromServer(json: any): Project {
        const entity: Project = Object.assign(new Project(), json);
        return entity;
    }

    /**
     * Convert a Project to a JSON which can be sent to the server.
     */
    private convert(project: Project): Project {
        const copy: Project = Object.assign({}, project);
        return copy;
    }
}
