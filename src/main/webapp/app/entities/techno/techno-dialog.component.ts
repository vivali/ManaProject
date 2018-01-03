import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Techno } from './techno.model';
import { TechnoPopupService } from './techno-popup.service';
import { TechnoService } from './techno.service';

@Component({
    selector: 'jhi-techno-dialog',
    templateUrl: './techno-dialog.component.html'
})
export class TechnoDialogComponent implements OnInit {

    techno: Techno;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private technoService: TechnoService,
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
        if (this.techno.id !== undefined) {
            this.subscribeToSaveResponse(
                this.technoService.update(this.techno));
        } else {
            this.subscribeToSaveResponse(
                this.technoService.create(this.techno));
        }
    }

    private subscribeToSaveResponse(result: Observable<Techno>) {
        result.subscribe((res: Techno) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Techno) {
        this.eventManager.broadcast({ name: 'technoListModification', content: 'OK'});
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
    selector: 'jhi-techno-popup',
    template: ''
})
export class TechnoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private technoPopupService: TechnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.technoPopupService
                    .open(TechnoDialogComponent as Component, params['id']);
            } else {
                this.technoPopupService
                    .open(TechnoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
