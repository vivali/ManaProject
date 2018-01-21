import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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

import { AllProjectPopupService } from './all-project-popup.service';
import { User, UserService, Principal } from '../shared';
import { ResponseWrapper } from '../shared';

@Component({
    selector: 'jhi-all-project-dialog',
    templateUrl: './all-project-dialog.component.html'
})
export class AllProjectDialogComponent implements OnInit {

    project: Project;
    isSaving: boolean;

    users: User[];
    user: User = new User();

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private projectService: ProjectService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((resp) => {
            this.user.id = resp.id;
            this.user.login = resp.login;
            this.user.firstName = resp.firstName;
            this.user.lastName = resp.lastName;
            this.user.email = resp.email;
        });
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectService.update(this.project));
        } else {
            this.project.user = this.user;
            this.subscribeToSaveResponse(
                this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<Project>) {
        result.subscribe((res: Project) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Project) {
        this.eventManager.broadcast({ name: 'projectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-all-project-popup',
    template: ''
})
export class AllProjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: AllProjectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projectPopupService
                    .open(AllProjectDialogComponent as Component, params['id']);
            } else {
                this.projectPopupService
                    .open(AllProjectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
