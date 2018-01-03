import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Techno } from './techno.model';
import { TechnoPopupService } from './techno-popup.service';
import { TechnoService } from './techno.service';

@Component({
    selector: 'jhi-techno-delete-dialog',
    templateUrl: './techno-delete-dialog.component.html'
})
export class TechnoDeleteDialogComponent {

    techno: Techno;

    constructor(
        private technoService: TechnoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.technoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'technoListModification',
                content: 'Deleted an techno'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-techno-delete-popup',
    template: ''
})
export class TechnoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private technoPopupService: TechnoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.technoPopupService
                .open(TechnoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
