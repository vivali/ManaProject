import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { FuncNeed } from './func-need.model';
import { FuncNeedService } from './func-need.service';

@Component({
    selector: 'jhi-func-need-detail',
    templateUrl: './func-need-detail.component.html'
})
export class FuncNeedDetailComponent implements OnInit, OnDestroy {

    funcNeed: FuncNeed;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private funcNeedService: FuncNeedService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFuncNeeds();
    }

    load(id) {
        this.funcNeedService.find(id).subscribe((funcNeed) => {
            this.funcNeed = funcNeed;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFuncNeeds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'funcNeedListModification',
            (response) => this.load(this.funcNeed.id)
        );
    }
}
