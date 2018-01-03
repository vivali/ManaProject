import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FuncNeed } from './func-need.model';
import { FuncNeedPopupService } from './func-need-popup.service';
import { FuncNeedService } from './func-need.service';

@Component({
    selector: 'jhi-func-need-delete-dialog',
    templateUrl: './func-need-delete-dialog.component.html'
})
export class FuncNeedDeleteDialogComponent {

    funcNeed: FuncNeed;

    constructor(
        private funcNeedService: FuncNeedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.funcNeedService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'funcNeedListModification',
                content: 'Deleted an funcNeed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-func-need-delete-popup',
    template: ''
})
export class FuncNeedDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private funcNeedPopupService: FuncNeedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.funcNeedPopupService
                .open(FuncNeedDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
