import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TechNeed } from './tech-need.model';
import { TechNeedPopupService } from './tech-need-popup.service';
import { TechNeedService } from './tech-need.service';

@Component({
    selector: 'jhi-tech-need-dialog',
    templateUrl: './tech-need-dialog.component.html'
})
export class TechNeedDialogComponent implements OnInit {

    techNeed: TechNeed;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private techNeedService: TechNeedService,
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
        if (this.techNeed.id !== undefined) {
            this.subscribeToSaveResponse(
                this.techNeedService.update(this.techNeed));
        } else {
            this.subscribeToSaveResponse(
                this.techNeedService.create(this.techNeed));
        }
    }

    private subscribeToSaveResponse(result: Observable<TechNeed>) {
        result.subscribe((res: TechNeed) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TechNeed) {
        this.eventManager.broadcast({ name: 'techNeedListModification', content: 'OK'});
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
    selector: 'jhi-tech-need-popup',
    template: ''
})
export class TechNeedPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private techNeedPopupService: TechNeedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.techNeedPopupService
                    .open(TechNeedDialogComponent as Component, params['id']);
            } else {
                this.techNeedPopupService
                    .open(TechNeedDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
