import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TnDesc } from './tn-desc.model';
import { TnDescService } from './tn-desc.service';

@Component({
    selector: 'jhi-tn-desc-detail',
    templateUrl: './tn-desc-detail.component.html'
})
export class TnDescDetailComponent implements OnInit, OnDestroy {

    tnDesc: TnDesc;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tnDescService: TnDescService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTnDescs();
    }

    load(id) {
        this.tnDescService.find(id).subscribe((tnDesc) => {
            this.tnDesc = tnDesc;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTnDescs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tnDescListModification',
            (response) => this.load(this.tnDesc.id)
        );
    }
}
