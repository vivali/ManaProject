import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Techno } from './techno.model';
import { TechnoService } from './techno.service';

@Component({
    selector: 'jhi-techno-detail',
    templateUrl: './techno-detail.component.html'
})
export class TechnoDetailComponent implements OnInit, OnDestroy {

    techno: Techno;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private technoService: TechnoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTechnos();
    }

    load(id) {
        this.technoService.find(id).subscribe((techno) => {
            this.techno = techno;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTechnos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'technoListModification',
            (response) => this.load(this.techno.id)
        );
    }
}
