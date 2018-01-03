import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FnDesc } from './fn-desc.model';
import { FnDescPopupService } from './fn-desc-popup.service';
import { FnDescService } from './fn-desc.service';

@Component({
    selector: 'jhi-fn-desc-delete-dialog',
    templateUrl: './fn-desc-delete-dialog.component.html'
})
export class FnDescDeleteDialogComponent {

    fnDesc: FnDesc;

    constructor(
        private fnDescService: FnDescService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fnDescService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fnDescListModification',
                content: 'Deleted an fnDesc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fn-desc-delete-popup',
    template: ''
})
export class FnDescDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fnDescPopupService: FnDescPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fnDescPopupService
                .open(FnDescDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
