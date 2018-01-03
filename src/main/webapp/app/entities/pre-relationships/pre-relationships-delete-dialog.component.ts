import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PreRelationships } from './pre-relationships.model';
import { PreRelationshipsPopupService } from './pre-relationships-popup.service';
import { PreRelationshipsService } from './pre-relationships.service';

@Component({
    selector: 'jhi-pre-relationships-delete-dialog',
    templateUrl: './pre-relationships-delete-dialog.component.html'
})
export class PreRelationshipsDeleteDialogComponent {

    preRelationships: PreRelationships;

    constructor(
        private preRelationshipsService: PreRelationshipsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.preRelationshipsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'preRelationshipsListModification',
                content: 'Deleted an preRelationships'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pre-relationships-delete-popup',
    template: ''
})
export class PreRelationshipsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private preRelationshipsPopupService: PreRelationshipsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.preRelationshipsPopupService
                .open(PreRelationshipsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
