import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionPopupService } from './version-popup.service';
import { VersionService } from './version.service';
import { Project, ProjectService } from '../project';
import { Techno, TechnoService } from '../techno';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-version-dialog',
    templateUrl: './version-dialog.component.html'
})
export class VersionDialogComponent implements OnInit {

    version: Version;
    isSaving: boolean;

    projects: Project[];

    technos: Techno[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private versionService: VersionService,
        private projectService: ProjectService,
        private technoService: TechnoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.technoService.query()
            .subscribe((res: ResponseWrapper) => { this.technos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.version.id !== undefined) {
            this.subscribeToSaveResponse(
                this.versionService.update(this.version));
        } else {
            this.subscribeToSaveResponse(
                this.versionService.create(this.version));
        }
    }

    private subscribeToSaveResponse(result: Observable<Version>) {
        result.subscribe((res: Version) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Version) {
        this.eventManager.broadcast({ name: 'versionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }

    trackTechnoById(index: number, item: Techno) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-version-popup',
    template: ''
})
export class VersionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private versionPopupService: VersionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.versionPopupService
                    .open(VersionDialogComponent as Component, params['id']);
            } else {
                this.versionPopupService
                    .open(VersionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
