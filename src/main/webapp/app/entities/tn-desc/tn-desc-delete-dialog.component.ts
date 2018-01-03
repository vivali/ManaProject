import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TnDesc } from './tn-desc.model';
import { TnDescPopupService } from './tn-desc-popup.service';
import { TnDescService } from './tn-desc.service';

@Component({
    selector: 'jhi-tn-desc-delete-dialog',
    templateUrl: './tn-desc-delete-dialog.component.html'
})
export class TnDescDeleteDialogComponent {

    tnDesc: TnDesc;

    constructor(
        private tnDescService: TnDescService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tnDescService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tnDescListModification',
                content: 'Deleted an tnDesc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tn-desc-delete-popup',
    template: ''
})
export class TnDescDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tnDescPopupService: TnDescPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tnDescPopupService
                .open(TnDescDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
