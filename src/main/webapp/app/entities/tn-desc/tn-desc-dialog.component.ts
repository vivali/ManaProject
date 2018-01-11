import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TnDesc } from './tn-desc.model';
import { TnDescPopupService } from './tn-desc-popup.service';
import { TnDescService } from './tn-desc.service';
import { TechNeed, TechNeedService } from '../tech-need';
import { Project, ProjectService } from '../project';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tn-desc-dialog',
    templateUrl: './tn-desc-dialog.component.html'
})
export class TnDescDialogComponent implements OnInit {

    tnDesc: TnDesc;
    isSaving: boolean;

    techneeds: TechNeed[];

    projects: Project[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tnDescService: TnDescService,
        private techNeedService: TechNeedService,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.techNeedService.query()
            .subscribe((res: ResponseWrapper) => { this.techneeds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        console.log(this.tnDesc.projectid);
        if (this.tnDesc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tnDescService.update(this.tnDesc));
        } else {
            this.subscribeToSaveResponse(
                this.tnDescService.create(this.tnDesc));
        }
    }

    private subscribeToSaveResponse(result: Observable<TnDesc>) {
        result.subscribe((res: TnDesc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TnDesc) {
        this.eventManager.broadcast({ name: 'tnDescListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTechNeedById(index: number, item: TechNeed) {
        return item.id;
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tn-desc-popup',
    template: ''
})
export class TnDescPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tnDescPopupService: TnDescPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tnDescPopupService
                    .open(TnDescDialogComponent as Component, params['id']);
            } else {
                this.tnDescPopupService
                    .open(TnDescDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
