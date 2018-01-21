import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Project, ProjectService } from '../entities/project';
import { TechNeed, TechNeedService } from '../entities/tech-need';
import { TnDesc, TnDescService } from '../entities/tn-desc';
import { FuncNeed, FuncNeedService } from '../entities/func-need';
import { FnDesc, FnDescService } from '../entities/fn-desc';
import { Techno, technoRoute } from '../entities/techno';
import { Version, VersionService } from '../entities/version';
import { Role, RoleService } from '../entities/role';
import { Experience, ExperienceService } from '../entities/experience';
import { PreRelationships, PreRelationshipsService } from '../entities/pre-relationships';

import { Principal } from '../shared';

@Component({
    selector: 'jhi-all-project-detail',
    templateUrl: './all-project-detail.component.html'
})
export class AllProjectDetailComponent implements OnInit, OnDestroy {

    project: Project;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    currentAccount: any;

    constructor(
        private eventManager: JhiEventManager,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjects();
    }

    load(id) {
        this.projectService.find(id).subscribe((project) => {
            this.project = project;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectListModification',
            (response) => this.load(this.project.id)
        );
    }
}
