import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TechNeed } from './tech-need.model';
import { TechNeedPopupService } from './tech-need-popup.service';
import { TechNeedService } from './tech-need.service';

@Component({
    selector: 'jhi-tech-need-delete-dialog',
    templateUrl: './tech-need-delete-dialog.component.html'
})
export class TechNeedDeleteDialogComponent {

    techNeed: TechNeed;

    constructor(
        private techNeedService: TechNeedService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.techNeedService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'techNeedListModification',
                content: 'Deleted an techNeed'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tech-need-delete-popup',
    template: ''
})
export class TechNeedDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private techNeedPopupService: TechNeedPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.techNeedPopupService
                .open(TechNeedDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
