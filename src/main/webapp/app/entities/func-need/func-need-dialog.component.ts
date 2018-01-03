import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FuncNeed } from './func-need.model';
import { FuncNeedPopupService } from './func-need-popup.service';
import { FuncNeedService } from './func-need.service';

@Component({
    selector: 'jhi-func-need-dialog',
    templateUrl: './func-need-dialog.component.html'
})
export class FuncNeedDialogComponent implements OnInit {

    funcNeed: FuncNeed;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private funcNeedService: FuncNeedService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.funcNeed.id !== undefined) {
            this.subscribeToSaveResponse(
                this.funcNeedService.update(this.funcNeed));
        } else {
            this.subscribeToSaveResponse(
                this.funcNeedService.create(this.funcNeed));
        }
    }

    private subscribeToSaveResponse(result: Observable<FuncNeed>) {
        result.subscribe((res: FuncNeed) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FuncNeed) {
        this.eventManager.broadcast({ name: 'funcNeedListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-func-need-popup',
    template: ''
})
export class FuncNeedPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private funcNeedPopupService: FuncNeedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.funcNeedPopupService
                    .open(FuncNeedDialogComponent as Component, params['id']);
            } else {
                this.funcNeedPopupService
                    .open(FuncNeedDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
