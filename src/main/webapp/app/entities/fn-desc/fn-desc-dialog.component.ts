import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FnDesc } from './fn-desc.model';
import { FnDescPopupService } from './fn-desc-popup.service';
import { FnDescService } from './fn-desc.service';
import { Project, ProjectService } from '../project';
import { FuncNeed, FuncNeedService } from '../func-need';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-fn-desc-dialog',
    templateUrl: './fn-desc-dialog.component.html'
})
export class FnDescDialogComponent implements OnInit {

    fnDesc: FnDesc;
    isSaving: boolean;

    projects: Project[];

    funcneeds: FuncNeed[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fnDescService: FnDescService,
        private projectService: ProjectService,
        private funcNeedService: FuncNeedService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.funcNeedService.query()
            .subscribe((res: ResponseWrapper) => { this.funcneeds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fnDesc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fnDescService.update(this.fnDesc));
        } else {
            this.subscribeToSaveResponse(
                this.fnDescService.create(this.fnDesc));
        }
    }

    private subscribeToSaveResponse(result: Observable<FnDesc>) {
        result.subscribe((res: FnDesc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FnDesc) {
        this.eventManager.broadcast({ name: 'fnDescListModification', content: 'OK'});
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

    trackFuncNeedById(index: number, item: FuncNeed) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-fn-desc-popup',
    template: ''
})
export class FnDescPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fnDescPopupService: FnDescPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fnDescPopupService
                    .open(FnDescDialogComponent as Component, params['id']);
            } else {
                this.fnDescPopupService
                    .open(FnDescDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
