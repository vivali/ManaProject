import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Project } from '../entities/project/project.model';
import { TechNeed } from '../entities/tech-need/tech-need.model';
import { TnDesc } from '../entities/tn-desc/tn-desc.model';
import { FuncNeed } from '../entities/func-need/func-need.model';
import { FnDesc } from '../entities/fn-desc/fn-desc.model';
import { Techno } from '../entities/techno/techno.model';
import { Version } from '../entities/version/version.model';
import { Role } from '../entities/role/role.model';
import { Experience } from '../entities/experience/experience.model';
import { PreRelationships } from '../entities/pre-relationships/pre-relationships.model';

import { AllProjectService } from './all-project.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../shared';

@Component({
    selector: 'jhi-all-project',
    templateUrl: './all-project.component.html'
})
export class AllProjectComponent implements OnInit, OnDestroy {
    projects: Project[];
    techNeeds: TechNeed[];
    tnDescs: TnDesc[];
    funcNeeds: FuncNeed[];
    fnDescs: FnDesc[];
    technos: Techno[];
    versions: Version[];
    roles: Role[];
    experiences: Experience[];
    preRelationships: PreRelationships[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private allProjectService: AllProjectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.allProjectService.queryProject().subscribe(
            (res: ResponseWrapper) => {
                this.projects = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryTechNeed().subscribe(
            (res: ResponseWrapper) => {
                this.techNeeds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryTnDesc().subscribe(
            (res: ResponseWrapper) => {
                this.tnDescs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryFuncNeed().subscribe(
            (res: ResponseWrapper) => {
                this.funcNeeds = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryFnDesc().subscribe(
            (res: ResponseWrapper) => {
                this.fnDescs = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryTechno().subscribe(
            (res: ResponseWrapper) => {
                this.technos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.allProjectService.queryVersion().subscribe(
            (res: ResponseWrapper) => {
                this.versions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryRole().subscribe(
            (res: ResponseWrapper) => {
                this.roles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryExperience().subscribe(
            (res: ResponseWrapper) => {
                this.experiences = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

        this.allProjectService.queryPreRelationships().subscribe(
            (res: ResponseWrapper) => {
                this.preRelationships = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Project) {
        return item.id;
    }
    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe('projectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
