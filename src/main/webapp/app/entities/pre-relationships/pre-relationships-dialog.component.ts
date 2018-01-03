import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PreRelationships } from './pre-relationships.model';
import { PreRelationshipsPopupService } from './pre-relationships-popup.service';
import { PreRelationshipsService } from './pre-relationships.service';
import { Experience, ExperienceService } from '../experience';
import { Role, RoleService } from '../role';
import { Project, ProjectService } from '../project';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pre-relationships-dialog',
    templateUrl: './pre-relationships-dialog.component.html'
})
export class PreRelationshipsDialogComponent implements OnInit {

    preRelationships: PreRelationships;
    isSaving: boolean;

    experiences: Experience[];

    roles: Role[];

    projects: Project[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private preRelationshipsService: PreRelationshipsService,
        private experienceService: ExperienceService,
        private roleService: RoleService,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.experienceService.query()
            .subscribe((res: ResponseWrapper) => { this.experiences = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.roleService.query()
            .subscribe((res: ResponseWrapper) => { this.roles = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.preRelationships.id !== undefined) {
            this.subscribeToSaveResponse(
                this.preRelationshipsService.update(this.preRelationships));
        } else {
            this.subscribeToSaveResponse(
                this.preRelationshipsService.create(this.preRelationships));
        }
    }

    private subscribeToSaveResponse(result: Observable<PreRelationships>) {
        result.subscribe((res: PreRelationships) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PreRelationships) {
        this.eventManager.broadcast({ name: 'preRelationshipsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExperienceById(index: number, item: Experience) {
        return item.id;
    }

    trackRoleById(index: number, item: Role) {
        return item.id;
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pre-relationships-popup',
    template: ''
})
export class PreRelationshipsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preRelationshipsPopupService: PreRelationshipsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.preRelationshipsPopupService
                    .open(PreRelationshipsDialogComponent as Component, params['id']);
            } else {
                this.preRelationshipsPopupService
                    .open(PreRelationshipsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
